const express = require("express")
const fs = require("fs")
const path = require("path")
const https = require("https")

// files and apis imports
const { EnvConfig } = require("./conf/env-conf")
const errorHandlerMiddleware = require("./middlewares/catchErrors")
const middlewares = require("./middlewares/customHeaders")
const ErrorHandler = require("./utils/ErroHandler")
const getSystemInfo = require("./services/SystemInfo")
const sharedApis = require("./routes/shared_route")

// DB Connection
const connectionToDatabase = require("./conf/db-conf")

const main = async () => {
  try {
    // @MODE:- Common Error Handling
    // handling uncaught exception
    process.on("uncaughtException", (err) => {
      console.log(`Error: ${err.message}`)
      console.log(`server is shutting down due to handling uncaught exception`)
      process.exit(1)
    })
    // initialize the Database
    connectionToDatabase()

    // assign Port & initialize the server
    const Port = EnvConfig.PORT || 6002
    const HttpsPort = EnvConfig.PORT || 6003
    const app = express()

    // @MODE:- Middlewares
    app.use(middlewares)
    app.use((req, res, next) => {
      const getUsage = getSystemInfo(process)
      req.systemInfo = {
        pid: process.pid,
        memoryUsage: getUsage.memoryInfo,
        cpuUsage: getUsage.cpuInfo,
        processUptime: `${(process.uptime() / 60).toFixed(4)} min`,
        platform: process.platform,
        architecture: process.arch,
        nodeVersion: process.version,
      }
      next()
    })
    // static folders setup
    app.use("/storage", express.static(path.join(__dirname, "./storage")))

    // Test Routes
    app.use("*/api/hq$", async (req, res, next) => {
      return res.status(200).json({
        msg: "success",
        systemInfo: req.systemInfo,
        data: "hello hamza", //.repeat(10000)
      })
    })
    // api's routes
    app.use("^/api", sharedApis)
    // NOT FOR PRODUCTION 💥💥💥
    app.use("^/error/logs$", async (req, res, next) => {
      const { file } = req.query
      const filePath = path.join(__dirname, "logs", "logs", `${file}`)

      // Check if the file exists
      if (fs.existsSync(filePath)) {
        res.download(filePath, file, (err) => {
          if (err) {
            return next(
              new ErrorHandler({
                message: "Error downloading the file.",
                status: 500,
              })
            )
          }
        })
      } else {
        return res.status(404).json({ msg: "file not found!" })
      }
    })

    // @MODE:- Unhandled Route
    app.all("*", (req, res) => {
      if (req.accepts("json")) {
        return res.status(404).json({ message: "Not Found!" })
      } else {
        return res.status(404).type("txt").send("Not Found!")
      }
    })

    // @MODE:- Common Error Handling
    // custome error handler
    app.use(errorHandlerMiddleware)

    // Custome SSL setup
    const options = {
      key: fs.readFileSync(path.join(__dirname, "./cert/ecdsa.key")),
      cert: fs.readFileSync(path.join(__dirname, "./cert/ecdsa.crt")),
    }

    // Create HTTP server
    // combining https with express server
    const sslServer = https.createServer(options, app)
    sslServer.listen(HttpsPort)
    const server = app.listen(Port, () =>
      console.log(
        `Task Worker:- ${process.pid} is assigned\nHTTPS Server is running on this url: https://localhost:${HttpsPort}\nHTTP Server is running on this url: http://localhost:${Port}\n Task Worker:- ${process.pid} is assigned.`
      )
    )

    // unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.log(
        `server is shutting down due to unhandled promise rejection, Error: ${err}`
      )
      console.log(`Error: ${err}`)
      errorHandlerMiddleware(err)
      server.close(() => {
        process.exit(1)
      })
    })
  } catch (error) {
    console.error("Error starting server:", error.message)
    errorHandlerMiddleware(error)
    process.exit(1)
  }
}
main()
  .then(() => {})
  .catch((err) => {
    console.error("Unhandled error:", error.message)
    errorHandlerMiddleware(error)
    process.exit(0)
  })

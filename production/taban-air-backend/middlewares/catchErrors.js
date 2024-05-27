const errorHandler = require("../utils/ErroHandler")
const logger = require("../logs/logger")

module.exports = (err, req, res, next) => {
  err.status = err.status || 500
  err.message = err.message || "Internal server error"

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `HQE: Json web token is invalid, try again.`
    err = new errorHandler({ message, status: 400 })
  }

  // jwt expired error
  if (err.name === "TokenExpiredError") {
    const message = `HQE: Json web token is expired, try again.`
    err = new errorHandler({ message, status: 400 })
  }

  // Handle Mongoose errors specifically
  if (err.name === "MongooseError") {
    if (err.kind === "ObjectId") {
      const message = `HQE: Resource not found, Invalid ID at path ${err.path}`
      err = new errorHandler({ message, status: 400 })
    } else if (err.code === 11000) {
      // Handle duplicate key errors
      const message = `HQE: Duplicate ${Object.keys(err.keyValue)} entered`
      err = new errorHandler({ message, status: 400 })
    } else {
      // Handle other Mongoose errors with a generic message
      const message = `Mongoose error: ${err.message}`
      err = new errorHandler({ message, status: 500 })
    }
  }

  // Reference error
  if (err.name === "ReferenceError") {
    console.log(
      `server is shutting down due to handling uncaught exception, Error: ${err.message}`
    )
    err = new errorHandler({ message: err.message, status: 500 })
    process.exit(1) // Exit with a non-zero code to signal an error
  }

  // Exit process with non-zero code for uncaught exceptions
  if (!req) {
    console.error("Uncaught exception:", err.message)
    err = new errorHandler({ message: err.message, status: 500 })
    process.exit(1)
    return
  }

  // this logger only for dev mode  (if deploy on vercel use database for logs or Vercel Edge Functions or AWS Lambda@Edge or choose any other platform for hosting backend)
  logger.error("Error", {
    url: req?.url,
    method: req?.method,
    ip: req?.ip,
    params: req?.params,
    query: req?.query,
    host: req?.hostname,
    Frsc_T: req?.headers["Frsc-t"],
    referrerUrl: req?.headers["referer"],
    error: { status: err.status, msg: err.message }, //stack: err.stack
    // userAgent: req?.headers["user-agent"],
    // cookies: req?.cookies,
    // responseTime: Date.now() - req?.createdAt,
  })

  res.status(err.status).json({
    success: false,
    message: err.message,
  })
}

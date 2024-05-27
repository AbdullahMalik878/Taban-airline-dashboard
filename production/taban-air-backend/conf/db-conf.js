const asyncRetry = require("async-retry")
const mongoose = require("mongoose")
const errorHandlerMiddleware = require("../middlewares/catchErrors")
const { EnvConfig } = require("./env-conf")

// mongoose.set("strictQuery", false) // remove this in production
async function connectToDatabase() {
  try {
    await asyncRetry(
      async () => {
        await mongoose.connect(EnvConfig.DATABASE_URI, {
          connectTimeoutMS: 30000,
          serverSelectionTimeoutMS: 100000,
        //   useNewUrlParser: true,
        })
      },
      {
        maxRetryTime: 60000, // Give up after retrying the function for 60 seconds
        retries: 4, // Set a maximum number of retries
        delay: (attemptNumber) => Math.pow(2, attemptNumber) * 1000, // Exponential backoff
        onRetry: (error, attemptNumber) => {
          console.warn(
            `Database connection failed: attempt ${attemptNumber}, error: ${error.message}, Retrying database connection...`
          )
        },
      }
    )
    console.log(
      `connection to DB is successfull host is: ${mongoose.connection.host}`
    )
  } catch (error) {
    console.error(error.message, "Failed to connect to database.")
    errorHandlerMiddleware(error)
  }
}

module.exports = connectToDatabase

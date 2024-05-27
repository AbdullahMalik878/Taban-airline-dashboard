const { createLogger, format, transports } = require("winston")
const { combine, timestamp, printf, metadata } = format
const path = require("path")
const { EnvConfig } = require("../conf/env-conf")

const env = EnvConfig.NODE_ENV || "development"
const logPath = path.join(__dirname, "logs/errors.log")

const myFormat = printf(
  ({ level, message, timestamp, metadata, stack, error }) => {
    const logData = {
      level: level,
      mode: message,
      timestamp,
      metadata,
    }
    if (error) {
      logData.error = error
    }
    if (stack) {
      logData.stack = stack
    }
    return JSON.stringify(logData) + ","
  }
)

// custom function for production error logs
const logger = createLogger({
  level: env === "production" ? "info" : "debug",
  format: combine(timestamp(), metadata(), myFormat),
  transports: [
    new transports.File({
      filename: logPath,
      lazy: true,
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
})

module.exports = logger

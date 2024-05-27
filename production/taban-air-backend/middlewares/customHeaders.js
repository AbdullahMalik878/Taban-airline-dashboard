const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const fs = require("fs")
const cors = require("cors")
const compression = require("compression")
const cookieParser = require("cookie-parser")
const mongoSanitize = require("express-mongo-sanitize")
const { EnvConfig } = require("../conf/env-conf")
const app = express()

// @MODE:- Cors setup
// handling cors error providing access
app.use(
  cors({
    credentials: true,
    origin: EnvConfig.RESOURCE_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization", "Frsc-t"],
    preflightContinue: true,
    optionsSuccessStatus: 200,
  })
)

// Enable trust proxy to correctly identify the client's IP address
app.enable("trust proxy", true)

// @MODE:- Middlewares
// mongoose sanitization
const sanitizer = mongoSanitize({
  replaceWith: "*", // The character that will be used to replace prohibited characters.
  allowDots: false, // Whether or not to allow dots in the input data.
})
// gzip compression
app.use(
  compression({
    level: 6,
    threshold: 100,
    filter: (req, res) => {
      // if client send this header means no compression then
      if (req.headers["x-no-compression"]) {
        return false
      }
      return compression.filter(req, res)
    },
  })
) //smaller than this will not be compress
app.use(express.json({ limit: "30mb" }))
app.use(cookieParser({ limit: "30mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(sanitizer)
app.use(morgan("common")) // prevent clickjacking
app.use(helmet.frameguard({ action: "deny" })) // X-Powered-By removing express
app.use(helmet.hidePoweredBy()) // X-Download-Options preventing potentially unsave downloads
app.use(helmet.ieNoOpen()) // preventing mime type sniffing
app.use(helmet.noSniff()) // preventing X-Xss
app.use(helmet.xssFilter({})) // DNS prefetchingControl
app.use(helmet.dnsPrefetchControl({ allow: true }))
app.use(helmet.xXssProtection({ mode: "block" }))

// applying (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", EnvConfig.RESOURCE_ORIGIN],
      "style-src": ["'self'", EnvConfig.RESOURCE_ORIGIN],
      "img-src": ["'self'", EnvConfig.RESOURCE_ORIGIN],
    },
    // useDefaults: true,
  })
)

// preventing man-in-middle attack(applying only https connection)
app.use(
  helmet.hsts({
    maxAge: 31536000, // One year
    includeSubDomains: true,
    preload: true,
  })
)

//   custom headers
app.use((req, res, next) => {
  res.set("cross-origin-resource-policy", EnvConfig.RESOURCE_ORIGIN)
  res.set("Access-Control-Allow-Credentials", "true")
  res.set("X-XSS-Protection", EnvConfig.XSS_PROTECTION)
  res.set("Access-Control-Expose-Headers", "Frsc-t")
  // if (req.method === 'OPTIONS') {
  // }
  next()
})

module.exports = app

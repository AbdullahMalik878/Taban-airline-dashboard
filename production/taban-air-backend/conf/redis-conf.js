const redis = require("ioredis")
const { EnvConfig } = require("./env-conf")
const errorHandlerMiddleware = require("../../middlewares/catchErrors")

const RedisConnectionConf = {
  host: EnvConfig.REDIS_HOST,
  port: EnvConfig.REDIS_PORT,
  password: EnvConfig.REDIS_PASSWORD,
  tls: {
    host: EnvConfig.REDIS_HOST,
    rejectUnauthorized: false,
  },
}

const ioRedisClient = () => {
  // Create a new Redis client instance with the desired configuration
  const client = redis.createClient(RedisConnectionConf)

  // Add event listeners directly to the client instance
  client.on("connect", () => console.log("Connected to Redis Upstash  🚀"))
  client.on("error", (err) => {
    console.error("Error:", err)
    errorHandlerMiddleware(err)
  })

  // Return the created Redis client
  return client
}

module.exports = { ioRedisClient, RedisConnectionConf }

require("dotenv").config()
const EnvConfig = {
  DATABASE_URI: process.env.DATABASE_URI,
  RESOURCE_ORIGIN: process.env.RESOURCE_ORIGIN,
  XSS_PROTECTION: process.env.XSS_PROTECTION,
  HASH_SECERET: process.env.HASH_SECERET,
  EXCEL_FILE_SIZE: process.env.EXCEL_FILE_SIZE,

  TOKEN_SECRET: process.env.Token_Secret,
  TOKEN_EXPIRE: process.env.Token_Expire,
  TOKEN_ALGORITHUM: process.env.Token_Algorithum,
  T_AUTH_AUDIENCE: process.env.TAuthAudience,
  ISSUER: process.env.issuer,

  COOKIE_EXPIRE: process.env.Cookie_Expiry,
  NODE_ENV: process.env.NODE_ENV,

  // cloudinary assets keys
  CLOUDINARY_CLOUD_NAME: process.env.Cloudinary_Cloud_Name,
  CLOUDINARY_API_KEY: process.env.Cloudinary_API_Key,
  CLOUDINARY_API_SECRET: process.env.Cloudinary_API_Secret,

  // Redis Aiven setup
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  // table pagination
  PERPAGE_DOCS_SIZE: process.env.PerPageDocSize,
  // MaxDocsUserCanRead:process.env.MaxDocsUserCanRead,
  // MaxLeadsExports:process.env.MaxLeadsExports,
}
module.exports = { EnvConfig }

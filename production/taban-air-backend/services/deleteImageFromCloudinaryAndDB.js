const attachmentModal = require("../models/shared/attachments")
const cloudinary = require("cloudinary").v2

// General Details
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports = async (publicId) => {
  if (publicId) {
    const cloudinaryOutput = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    })
    const DBOutPut = await attachmentModal.findOneAndDelete({
      "attachment.public_id": publicId,
    })
    if (!cloudinaryOutput) {
      return {
        hind: "CLOUDINARY_ERROR",
        response: cloudinaryOutput,
      }
    }
    if (!DBOutPut) {
      return {
        hind: "DB_ERROR",
        response: DBOutPut,
      }
    }
    return true
  }
}

const saveAttachements = require("../utils/saveAttachements")
const cloudinary = require("cloudinary").v2

// General Details
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports = async (attachement, folderPath, attachment_for, purpose) => {
  let attachment_var
  let savedAttachement
  if (attachement && attachement != undefined) {
    attachment_var = await cloudinary.uploader.upload(attachement, {
      folder: folderPath, //"etihad/payments"
      // transformation: { width: 500, height: 500, crop: "fill" },
    })
  }
  if (attachment_var) {
    savedAttachement = await saveAttachements({
      attachment_type: attachment_var.format,
      attachment_for: attachment_for,
      purpose: purpose,
      attachment: {
        url: attachment_var.url,
        secure_url: attachment_var.secure_url,
        public_id: attachment_var.public_id,
      },
    })
  }
  return savedAttachement ? savedAttachement : null
}

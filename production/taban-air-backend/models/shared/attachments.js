const mongoose = require("mongoose")

const attachmentSchema = new mongoose.Schema(
  {
    purpose: { type: String, required: false },
    attachment_type: { type: String, required: true },
    attachment: {
      url: { type: String, required: true },
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    attachment_for: { type: String, required: true }, // here user , payment,etc id
  },
  { timestamps: true }
)

const AttachemntModal = mongoose.model(
  "attachment",
  attachmentSchema,
  "attachments"
)

module.exports = AttachemntModal

const attachmentModal = require("../models/shared/attachments")

module.exports = async (data) => {
  const {
    attachment_type,
    attachment_for,
    purpose,
    attachment: { url, secure_url, public_id },
  } = data
  // save attachement
  if (public_id) {
    const NewImage = await attachmentModal({
      purpose,
      attachment_type,
      attachment_for,
      attachment: { url, secure_url, public_id },
    }).save()
    return {
      status: 200,
      NewImage,
    }
  } else {
    return {
      status: 400,
      msg: `attachemnt URL's or Public ID is missing`,
    }
  }
}

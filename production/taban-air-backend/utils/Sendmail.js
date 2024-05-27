const nodemailer = require("nodemailer")
const ErrorHandlerMiddleware = require("../middlewares/catchErrors")

module.exports = async (to, subject, data, attachementPath) => {
  let transporter = nodemailer.createTransport({
    host: "hq.TechTalks.info",
    service: "gmail",
    port: 587,
    // prot:465,
    auth: {
      user: "noman97301@gmail.com",
      pass: "zxtzxwpvpbqppfjw",
      // user: 'nola47@ethereal.email',
      // pass: 'kaxfNjSSJS4mefwdaK'
    },
  })

  //   prepare email body
  const payload = {}
  if (data?.service === "password") {
    payload.html = `<b>Your Random Password: </b> <span> ${data.payload}</span>`
  }
  if (data?.service === "changepassword") {
    payload.html = `<span> <b>Change Password:</b> <a href="${data.linkForChanginPassword}"> Click here 🚀</a> </span>`
  }
  if (data?.service === "exportleads") {
    payload.html = `<b>Exported Leads:</b> <span> ${data.message} </span>`
  }

  //   mailing options
  const mailOptions = {
    from: "HQ <hamzaqureshi2909@gmail.com>",
    to: `${to}`,
    subject: `${subject} ✔`, // Subject line
    html: payload?.html ? payload?.html : "",
  }
  if (attachementPath && data?.service === "exportleads")
    mailOptions.attachments = [
      {
        path: attachementPath, // Path to the file on disk
        filename: "leads_export.zip", // Path to the file on disk
      },
    ]

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log({
      accepted: info.accepted,
      rejected: info.rejected,
      messageId: info.messageId,
    })
    return true
  } catch (err) {
    console.error(err, "error while sending mail.")
    ErrorHandlerMiddleware(err)
    return false
  }
}

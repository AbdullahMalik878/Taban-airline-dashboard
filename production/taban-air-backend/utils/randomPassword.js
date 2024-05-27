const crypto = require("crypto")

// auto generate password
module.exports = () => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"

  // Create a password containing at least one uppercase letter, one lowercase letter, and one number
  const password = [
    uppercaseChars.charAt(crypto.randomInt(uppercaseChars.length)),
    lowercaseChars.charAt(crypto.randomInt(lowercaseChars.length)),
    numbers.charAt(crypto.randomInt(numbers.length)),
    crypto.randomUUID().replace(/-/g, "").substring(0, 5), // 5 random characters
  ].join("")

  return password
}

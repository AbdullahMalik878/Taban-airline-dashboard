const mongoose = require("mongoose")

// Currency Schema
const CurrencySchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, required: true, unique: true }, // dollar
    key: { type: String, required: true, unique: true }, // usd
    currentRate: { type: String, required: true }, // 280
  },
  { timestamps: true }
)

//   apply auto increment using .pre middleware
CurrencySchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastCurrencyId = await this.constructor.findOne(
      {},
      {},
      { sort: { id: -1 } }
    )
    if (lastCurrencyId) {
      this.id = lastCurrencyId.id + 1
    } else {
      this.id = 1
    }
  }
  next()
})

const Currencys =
  mongoose.models.currencys || mongoose.model("currencys", CurrencySchema)

module.exports = Currencys

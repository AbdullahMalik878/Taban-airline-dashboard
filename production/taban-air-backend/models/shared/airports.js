const mongoose = require("mongoose")

// AirPort Schema
const AirPortSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    key: { type: String, required: true, unique: true }, // LHE,MHD,KHI
    airport: { type: String, required: true, unique: true }, // Jinnah International Airport Karachi
    location: { type: String, required: true }, // PAK,IRAN
  },
  { timestamps: true }
)

//   apply auto increment using .pre middleware
AirPortSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastAirPortId = await this.constructor.findOne(
      {},
      {},
      { sort: { id: -1 } }
    )
    if (lastAirPortId) {
      this.id = lastAirPortId.id + 1
    } else {
      this.id = 1
    }
  }
  next()
})

const AirPorts =
  mongoose.models.airports || mongoose.model("airports", AirPortSchema)

module.exports = AirPorts

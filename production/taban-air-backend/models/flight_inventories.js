const mongoose = require("mongoose")

// flightInventories Schema
const flightInventoriesSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "flights",
      required: true,
    },
    airLine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "airlines",
      required: true,
    },
    airCraft: { type: String, required: true }, // airbus 320
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    slots: [
      {
        seat: { type: String, required: false },
        price: { type: String, required: false },
      },
    ],
    booked: { type: String, required: false },
    available: { type: String, required: false },
    inventoryLogs: [
      {
        type: mongoose.SchemaTypes.Mixed, // This is used to store any data that can be serialized into JSON
        required: false,
        default: {},
      },
    ],
  },
  { timestamps: true }
)

//   apply auto increment using .pre middleware
flightInventoriesSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastflightInventoriesId = await this.constructor.findOne(
      {},
      {},
      { sort: { id: -1 } }
    )
    if (lastflightInventoriesId) {
      this.id = lastflightInventoriesId.id + 1
    } else {
      this.id = 1
    }
  }
  next()
})

const flightInventories =
  mongoose.models.flightinventories ||
  mongoose.model("flightinventories", flightInventoriesSchema)

module.exports = flightInventories

const mongoose = require("mongoose")

// Flight Schema
const FlightSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    flightno: { type: String, required: true, unique: true }, // TBN7207
    origin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "airports",
      required: false,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "airports",
      required: false,
    },
    baggage: { type: String, required: true }, // 25
    pieces: { type: String, required: true }, // 1
    maxLoad: { type: String, required: true }, // 141
    flightInventories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "flightinventories",
        required: false,
      },
    ],
  },
  { timestamps: true }
)

//   apply auto increment using .pre middleware
FlightSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastFlightId = await this.constructor.findOne(
      {},
      {},
      { sort: { id: -1 } }
    )
    if (lastFlightId) {
      this.id = lastFlightId.id + 1
    } else {
      this.id = 1
    }
  }
  next()
})

const Flights =
  mongoose.models.flights || mongoose.model("flights", FlightSchema)

module.exports = Flights

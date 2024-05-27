const mongoose = require("mongoose")

// airline Schema
const airlineSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, required: true, unique: true }, // Taban Air
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attachment",
      required: false,
    },
  },
  { timestamps: true }
)

//   apply auto increment using .pre middleware
airlineSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastairlineId = await this.constructor.findOne(
      {},
      {},
      { sort: { id: -1 } }
    )
    if (lastairlineId) {
      this.id = lastairlineId.id + 1
    } else {
      this.id = 1
    }
  }
  next()
})

const airlines =
  mongoose.models.airlines || mongoose.model("airlines", airlineSchema)

module.exports = airlines

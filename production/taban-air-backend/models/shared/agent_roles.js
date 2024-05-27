const mongoose = require("mongoose")

// AgentRole Schema
const AgentRoleSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, required: true, unique: true }, // Sales Counter, Agent, DCS
  },
  { timestamps: true }
)

//   apply auto increment using .pre middleware
AgentRoleSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastAgentRoleId = await this.constructor.findOne(
      {},
      {},
      { sort: { id: -1 } }
    )
    if (lastAgentRoleId) {
      this.id = lastAgentRoleId.id + 1
    } else {
      this.id = 1
    }
  }
  next()
})

const AgentRoles =
  mongoose.models.agentroles || mongoose.model("agentroles", AgentRoleSchema)

module.exports = AgentRoles

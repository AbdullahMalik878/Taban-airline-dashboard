const router = require("express").Router()
const {
  CreateAirline,
  ReadAirLines,
  UpdateAirLine,
  DeleteAirLine,
  CreateAirPort,
  ReadAirPort,
  UpdateAirPort,
  DeleteAirPort,
  UpdateAgentRole,
  ReadAgentRole,
  CreateAgentRole,
  DeleteAgentRole,
  CreateCurrency,
  ReadCurrency,
  UpdateCurrency,
  DeleteCurrency,
} = require("../controllers/v1/shared_controller")
// const verifyTokenAndSessionCookie = require("../middlewares/")

// 💥 airline end-points
// @User
// @Mode :-user Route
// #POST /api/v1/createairline
router.post("/v1/createairline", CreateAirline)

// @User
// @Mode :-user Route
// #GET /api/v1/readairlines
router.get("/v1/readairlines", ReadAirLines)

// @User
// @Mode :-user Route
// #PUT /api/v1/updateairline
router.put("/v1/updateairline", UpdateAirLine)

// @User
// @Mode :-user Route
// #DELETE /api/v1/deleteairline
router.delete("/v1/deleteairline", DeleteAirLine)

// 💥 airports end-points
// @User
// @Mode :-user Route
// #POST /api/v1/createairport
router.post("/v1/createairport", CreateAirPort)

// @User
// @Mode :-user Route
// #GET /api/v1/readairport
router.get("/v1/readairport", ReadAirPort)

// @User
// @Mode :-user Route
// #PUT /api/v1/updateairport
router.put("/v1/updateairport", UpdateAirPort)

// @User
// @Mode :-user Route
// #DELETE /api/v1/deleteairport
router.delete("/v1/deleteairport", DeleteAirPort)

// 💥 agent roles end-points
// @User
// @Mode :-user Route
// #POST /api/v1/createagent
router.post("/v1/createagentrole", CreateAgentRole)

// @User
// @Mode :-user Route
// #GET /api/v1/readagent
router.get("/v1/readagentrole", ReadAgentRole)

// @User
// @Mode :-user Route
// #PUT /api/v1/updateagentrole
router.put("/v1/updateagentrole", UpdateAgentRole)

// @User
// @Mode :-user Route
// #DELETE /api/v1/deleteagentrole
router.delete("/v1/deleteagentrole", DeleteAgentRole)

// 💥 currency end-points
// @User
// @Mode :-user Route
// #POST /api/v1/createcurrency
router.post("/v1/createcurrency", CreateCurrency)

// @User
// @Mode :-user Route
// #GET /api/v1/readcurrency
router.get("/v1/readcurrency", ReadCurrency)

// @User
// @Mode :-user Route
// #PUT /api/v1/updatecurrency
router.put("/v1/updatecurrency", UpdateCurrency)

// @User
// @Mode :-user Route
// #DELETE /api/v1/deletecurrency
router.delete("/v1/deletecurrency", DeleteCurrency)

module.exports = router

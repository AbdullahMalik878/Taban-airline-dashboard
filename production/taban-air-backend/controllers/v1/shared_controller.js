const catchAsyncError = require("../../middlewares/catchAsyncError")
const { Responces, Messages } = require("../../utils/responces/responses")
const airlineModal = require("../../models/shared/airlines")
const airPortModal = require("../../models/shared/airports")
const agentModal = require("../../models/shared/agent_roles")
const currencyModal = require("../../models/shared/currency")
const ImageService = require("../../services/imageUploading")
const ErrorHandler = require("../../utils/ErroHandler")
const Joi = require("joi")
const deleteImageFromCloudinaryAndDB = require("../../services/deleteImageFromCloudinaryAndDB")

// 💥 airline end-points
// @User
// @Mode :- Controller
// #POST /createairline
const CreateAirline = catchAsyncError(async (req, res, next) => {
  const { name, image, Frsct } = req.body

  // fields validation
  const schema = Joi.object({
    // FrscT: Joi.string()
    //   .length(64)
    //   .required()
    //   .error(
    //     new Error("UNAUTHORIZED! \n You are not allowed to create countries.")
    //   ),
    name: Joi.string().required(),
    image: Joi.string().allow("").optional(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }

  //   // check if frscT exists in any session
  //   const CreationTokenExist = await SessionModal.findOne({ FrscToken: FrscT })
  //   if (!CreationTokenExist) {
  //     return next(
  //       new ErrorHandler({
  //         message: `You are not allowed to create affiliate Status.`,
  //         status: Responces.CONFLICT_ERROR,
  //       })
  //     )
  //   }

  let savedAirlineAttachement = null
  if (image) {
    savedAirlineAttachement = await ImageService(
      image,
      "taban/airline_images",
      "Airline Attachement",
      "New airline image."
    )
  }

  // 2. find airline already exist or not
  const findAirLine = await airlineModal
    .findOne({ name: new RegExp(name, "i") })
    .select("id name")
    .lean()
    .exec()
  if (findAirLine) {
    return next(
      new ErrorHandler({
        message: `AirLine: (${findAirLine?.name}) with id (${findAirLine?.id}) already exists!`,
        status: Responces.CONFLICT_ERROR,
      })
    )
  }
  let conditionalFields = {}
  if (savedAirlineAttachement)
    conditionalFields.image = savedAirlineAttachement?.NewImage?._id

  // 3. create airline
  const newAirline = await airlineModal({
    name,
    ...conditionalFields,
  }).save()

  return res.status(Responces.CREATED).json({
    success: Messages.CREATED,
    // airline: newAirline,
  })
})

// @User
// @Mode :- Controller
// #GET /readairline
const ReadAirLines = catchAsyncError(async (req, res, next) => {
  // find all airlines
  const findAirlines = await airlineModal
    .find({})
    .select("id name image ")
    .populate({
      path: "image",
      model: "attachment",
      select: "purpose attachment_type attachment attachment_for",
    })
    .lean()
    .exec()

  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    airlines: findAirlines,
  })
})

// @User
// @Mode :- Controller
// #PUT /updateairline
const UpdateAirLine = catchAsyncError(async (req, res, next) => {
  const { _id, name, image, publicId, Frsct } = req.body
  // fields validation
  const schema = Joi.object({
    // FrscT: Joi.string()
    //   .length(64)
    //   .required()
    //   .error(
    //     new Error("UNAUTHORIZED! \n You are not allowed to create countries.")
    //   ),
    _id: Joi.string().hex().length(24).required(),
    name: Joi.string().required(),
    image: Joi.string().allow("").optional(),
    publicId: Joi.string().allow("").optional(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }

  let newAirlineImage = null
  if (image) {
    const deleteExistingImage = await deleteImageFromCloudinaryAndDB(publicId)
    if (deleteExistingImage) {
      newAirlineImage = await ImageService(
        image,
        "taban/airline_images",
        "Airline Attachement",
        "New airline image."
      )
    }
  }

  let conditionalFields = {}
  if (newAirlineImage) conditionalFields.image = newAirlineImage?.NewImage?._id

  // update airline
  const updatedAirline = await airlineModal.findOneAndUpdate(
    {
      _id,
    },
    {
      $set: {
        name,
        ...conditionalFields,
      },
    },
    { new: true }
  )

  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    updatedAirline,
  })
})

// @User
// @Mode :- Controller
// #DELERE /deleteairline
const DeleteAirLine = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body
  // fields validation
  const schema = Joi.object({
    _id: Joi.string().hex().length(24).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }

  // delete airline
  const airline = await airlineModal.findOneAndDelete({
    _id,
  })
  if (!airline) {
    return next(
      new ErrorHandler({
        message: "AirLine Not Found!",
        status: Responces.NOT_FOUND,
      })
    )
  }

  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    message: "AirLine Deleted!",
  })
})

// 💥 airports end-points
// @User
// @Mode :- Controller
// #POST /createairport
const CreateAirPort = catchAsyncError(async (req, res, next) => {
  const { key, airport, location, Frsct } = req.body

  // fields validation
  const schema = Joi.object({
    // FrscT: Joi.string()
    //   .length(64)
    //   .required()
    //   .error(
    //     new Error("UNAUTHORIZED! \n You are not allowed to create countries.")
    //   ),
    key: Joi.string().required(),
    airport: Joi.string().required(),
    location: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }

  //   // check if frscT exists in any session
  //   const CreationTokenExist = await SessionModal.findOne({ FrscToken: FrscT })
  //   if (!CreationTokenExist) {
  //     return next(
  //       new ErrorHandler({
  //         message: `You are not allowed to create affiliate Status.`,
  //         status: Responces.CONFLICT_ERROR,
  //       })
  //     )
  //   }

  // 2. find airport already exist or not
  const findAirPort = await airPortModal
    .findOne({
      $and: [{ key: key }, { airport: new RegExp(airport, "i") }],
    })
    .select("id airport key location")
    .lean()
    .exec()
  if (findAirPort) {
    return next(
      new ErrorHandler({
        message: `AirPort: (${findAirPort?.airport}) with id (${findAirPort?.id}) already exists!`,
        status: Responces.CONFLICT_ERROR,
      })
    )
  }

  // 3. create airport
  const newAirPort = await airPortModal({
    key,
    airport,
    location,
  }).save()

  return res.status(Responces.CREATED).json({
    success: Messages.CREATED,
    // airport: newAirPort,
  })
})

// @User
// @Mode :- Controller
// #GET /readairport
const ReadAirPort = catchAsyncError(async (req, res, next) => {
  // find all airports
  const findAirPort = await airPortModal
    .find({})
    .select("id key airport location")
    .lean()
    .exec()

  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    airports: findAirPort,
  })
})

// @User
// @Mode :- Controller
// #PUT /updateairport
const UpdateAirPort = catchAsyncError(async (req, res, next) => {
  const { _id, key, airport, location, Frsct } = req.body
  // fields validation
  const schema = Joi.object({
    // FrscT: Joi.string()
    //   .length(64)
    //   .required()
    //   .error(
    //     new Error("UNAUTHORIZED! \n You are not allowed to create countries.")
    //   ),
    _id: Joi.string().hex().length(24).required(),
    key: Joi.string().optional(),
    airport: Joi.string().optional(),
    location: Joi.string().optional(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }
  let conditionalFields = {}
  if (key) conditionalFields.key = key
  if (airport) conditionalFields.airport = airport
  if (location) conditionalFields.location = location

  // update airport
  const updatedAirPort = await airPortModal.findOneAndUpdate(
    {
      _id,
    },
    {
      $set: {
        ...conditionalFields,
      },
    },
    { new: true }
  )

  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    updatedAirPort,
  })
})

// @User
// @Mode :- Controller
// #DELERE /deleteairport
const DeleteAirPort = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body
  // fields validation
  const schema = Joi.object({
    _id: Joi.string().hex().length(24).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }

  // delete airport
  const airport = await airPortModal.findOneAndDelete({
    _id,
  })

  if (!airport) {
    return next(
      new ErrorHandler({
        message: "Air Port Not Found!",
        status: Responces.NOT_FOUND,
      })
    )
  }
  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    message: "AirPort Deleted!",
  })
})

// 💥 agent roles end-points
// @User
// @Mode :- Controller
// #POST /createagentrole
const CreateAgentRole = catchAsyncError(async (req, res, next) => {
  const { name, Frsct } = req.body

  // fields validation
  const schema = Joi.object({
    // FrscT: Joi.string()
    //   .length(64)
    //   .required()
    //   .error(
    //     new Error("UNAUTHORIZED! \n You are not allowed to create countries.")
    //   ),
    name: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }

  //   // check if frscT exists in any session
  //   const CreationTokenExist = await SessionModal.findOne({ FrscToken: FrscT })
  //   if (!CreationTokenExist) {
  //     return next(
  //       new ErrorHandler({
  //         message: `You are not allowed to create affiliate Status.`,
  //         status: Responces.CONFLICT_ERROR,
  //       })
  //     )
  //   }

  // 2. find agent already exist or not
  const findAgent = await agentModal
    .findOne({ name: new RegExp(name, "i") })
    .select("id name")
    .lean()
    .exec()
  if (findAgent) {
    return next(
      new ErrorHandler({
        message: `Agent: (${findAgent?.name}) with id (${findAgent?.id}) already exists!`,
        status: Responces.CONFLICT_ERROR,
      })
    )
  }

  // 3. create agent
  const newAgent = await agentModal({
    name,
  }).save()

  return res.status(Responces.CREATED).json({
    success: Messages.CREATED,
    // airageng: newAgent,
  })
})

// @User
// @Mode :- Controller
// #GET /readagentrole
const ReadAgentRole = catchAsyncError(async (req, res, next) => {
  // find all airports
  const findAirPort = await agentModal.find({}).select("id name").lean().exec()

  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    airports: findAirPort,
  })
})

// @User
// @Mode :- Controller
// #PUT /updateagentrole
const UpdateAgentRole = catchAsyncError(async (req, res, next) => {
  const { _id, name, Frsct } = req.body
  // fields validation
  const schema = Joi.object({
    // FrscT: Joi.string()
    //   .length(64)
    //   .required()
    //   .error(
    //     new Error("UNAUTHORIZED! \n You are not allowed to create countries.")
    //   ),
    _id: Joi.string().hex().length(24).required(),
    name: Joi.string().optional(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }
  let conditionalFields = {}
  if (name) conditionalFields.name = name

  // update agent role
  const updatedAgentRole = await agentModal.findOneAndUpdate(
    {
      _id,
    },
    {
      $set: {
        ...conditionalFields,
      },
    },
    { new: true }
  )
  if (!updatedAgentRole) {
    return next(
      new ErrorHandler({
        message: "Agent Not Found!",
        status: Responces.NOT_FOUND,
      })
    )
  }

  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    updatedAgentRole,
  })
})

// @User
// @Mode :- Controller
// #DELERE /deleteagentrole
const DeleteAgentRole = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body
  // fields validation
  const schema = Joi.object({
    _id: Joi.string().hex().length(24).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }

  // delete agent
  const agent = await agentModal.findOneAndDelete({
    _id,
  })

  if (!agent) {
    return next(
      new ErrorHandler({
        message: "Agent Not Found!",
        status: Responces.NOT_FOUND,
      })
    )
  }
  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    message: "Agent Deleted!",
  })
})

// 💥 currency end-points
// @User
// @Mode :- Controller
// #POST /createcurrency
const CreateCurrency = catchAsyncError(async (req, res, next) => {
  const { name, key, currentRateInPkr, Frsct } = req.body

  // fields validation
  const schema = Joi.object({
    // FrscT: Joi.string()
    //   .length(64)
    //   .required()
    //   .error(
    //     new Error("UNAUTHORIZED! \n You are not allowed to create countries.")
    //   ),
    name: Joi.string().required(),
    key: Joi.string().required(),
    currentRateInPkr: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }

  //   // check if frscT exists in any session
  //   const CreationTokenExist = await SessionModal.findOne({ FrscToken: FrscT })
  //   if (!CreationTokenExist) {
  //     return next(
  //       new ErrorHandler({
  //         message: `You are not allowed to create affiliate Status.`,
  //         status: Responces.CONFLICT_ERROR,
  //       })
  //     )
  //   }

  // 2. find currency already exist or not
  const findCurrency = await currencyModal
    .findOne({ $or: [{ name: new RegExp(name, "i") }, { key: key }] })
    .select("id name key currentRate")
    .lean()
    .exec()
  if (findCurrency) {
    return next(
      new ErrorHandler({
        message: `Currency: (${findCurrency?.name}) with id (${findCurrency?.id}) already exists!`,
        status: Responces.CONFLICT_ERROR,
      })
    )
  }

  // 3. create currency
  const newCurrency = await currencyModal({
    name,
    key,
    currentRate: currentRateInPkr,
  }).save()

  return res.status(Responces.CREATED).json({
    success: Messages.CREATED,
    // airageng: newCurrency,
  })
})

// @User
// @Mode :- Controller
// #GET /readcurrency
const ReadCurrency = catchAsyncError(async (req, res, next) => {
  // find all currencies
  const findCurrencies = await currencyModal
    .find({})
    .select("id name key currentRate")
    .lean()
    .exec()

  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    currencies: findCurrencies,
  })
})

// @User
// @Mode :- Controller
// #PUT /updatecurrency
const UpdateCurrency = catchAsyncError(async (req, res, next) => {
  const { _id, name, key, newRate, Frsct } = req.body
  // fields validation
  const schema = Joi.object({
    // FrscT: Joi.string()
    //   .length(64)
    //   .required()
    //   .error(
    //     new Error("UNAUTHORIZED! \n You are not allowed to create countries.")
    //   ),
    _id: Joi.string().hex().length(24).required(),
    name: Joi.string().optional(),
    key: Joi.string().optional(),
    newRate: Joi.string().optional(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }
  let conditionalFields = {}
  if (name) conditionalFields.name = name
  if (key) conditionalFields.key = key
  if (newRate) conditionalFields.currentRate = newRate

  // update currency
  const updatedCurrency = await currencyModal.findOneAndUpdate(
    {
      _id,
    },
    {
      $set: {
        ...conditionalFields,
      },
    },
    { new: true }
  )
  if (!updatedCurrency) {
    return next(
      new ErrorHandler({
        message: "Currency Record Not Found!",
        status: Responces.NOT_FOUND,
      })
    )
  }

  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    updatedCurrency,
  })
})

// @User
// @Mode :- Controller
// #DELERE /deletecurrency
const DeleteCurrency = catchAsyncError(async (req, res, next) => {
  const { _id } = req.body
  // fields validation
  const schema = Joi.object({
    _id: Joi.string().hex().length(24).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return next(
      new ErrorHandler({
        message: error.message,
        status: Responces.INCOMPLETE_INFORMATION,
      })
    )
  }

  // delete currency
  const currency = await currencyModal.findOneAndDelete({
    _id,
  })

  if (!currency) {
    return next(
      new ErrorHandler({
        message: "Currency Record Not Found!",
        status: Responces.NOT_FOUND,
      })
    )
  }
  return res.status(Responces.SUCCESS).json({
    success: Messages.SUCCESS,
    message: "Currency Deleted!",
  })
})

module.exports = {
  CreateAirline,
  ReadAirLines,
  UpdateAirLine,
  DeleteAirLine,
  CreateAirPort,
  ReadAirPort,
  UpdateAirPort,
  DeleteAirPort,
  CreateAgentRole,
  ReadAgentRole,
  UpdateAgentRole,
  DeleteAgentRole,
  CreateCurrency,
  ReadCurrency,
  UpdateCurrency,
  DeleteCurrency,
}

const router = require('express').Router()
const methodNotAllowed = require('../errors/methodNotAllowed')
const controller = require("./reviews.controller")

router.route("/").all(methodNotAllowed)

router.route("/:reviewId").put(controller.update).delete(controller.delete).all(methodNotAllowed)


module.exports = router
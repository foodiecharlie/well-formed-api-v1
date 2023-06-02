const express = require('express')
const router = express.Router()
const EventController = require('./controller')
const ParticipantController = require('../participant/controller')
const catchAsync = require('../../utils/catchAsync')
const { checkEvent } = require('../../middleware')

router.get('/', catchAsync(EventController.getAllEvents))
router.get('/:eventSlug', checkEvent, catchAsync(EventController.showEvent))
router.get('/:eventSlug/participants', checkEvent, catchAsync(ParticipantController.getParticipantsByEvent))
router.get('/:eventSlug/participants/:userId', checkEvent, catchAsync(ParticipantController.showParticipant))

module.exports = router
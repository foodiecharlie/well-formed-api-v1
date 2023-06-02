const express = require('express')
const router = express.Router()
const ProfileController = require('./controller')
const StarsController = require('../stars/controller')
const LinkController = require('../link/controller')
const ProjectController = require('../project/controller')
const catchAsync = require('../../utils/catchAsync')
const { requireAuth } = require('../../passport')
const { checkEvent } = require('../../middleware')

router.get('/', requireAuth, catchAsync(ProfileController.showProfile))
router.get('/stars/by-event/:eventSlug/', requireAuth, checkEvent, catchAsync(StarsController.getTeamsByEvent))

router.post('/links', requireAuth, catchAsync(LinkController.createLink))
router.post('/projects', requireAuth, catchAsync(ProjectController.createProject))

router.put('/', requireAuth, catchAsync(ProfileController.updateProfile))
router.patch('/archive', requireAuth, catchAsync(ProfileController.archiveProfile))
router.put('/links/:linkId', requireAuth, catchAsync(LinkController.updateLink))
router.put('/projects/:projectId', requireAuth, catchAsync(ProjectController.updateProject))

router.delete('/links/:linkId', requireAuth, catchAsync(LinkController.deleteLink))
router.delete('/projects/:projectId', requireAuth, catchAsync(ProjectController.deleteProject))

module.exports = router
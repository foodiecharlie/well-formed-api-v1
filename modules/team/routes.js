const express = require('express')
const router = express.Router()
const TeamController = require('./controller')
const MemberController = require('../member/controller')
const PositionController = require('../position/controller')
const StarsController = require('../stars/controller')
const catchAsync = require('../../utils/catchAsync')
const { requireAuth } = require('../../passport')
const { checkEvent, checkTeam, isTeamOwner, isParticipant, checkTeamMember, checkPosition } = require('../../middleware')

router.get('/by-event/:eventSlug', checkEvent, catchAsync(TeamController.getTeamsByEvent))
router.get('/:teamId', checkTeam, catchAsync(TeamController.showTeam))
router.get('/:teamId/members/:memberId', checkTeam, catchAsync(MemberController.showMember))

router.post('/:eventSlug', requireAuth, checkEvent, catchAsync(TeamController.createTeam))
router.post('/:teamId/members', requireAuth, checkTeam, isTeamOwner, isParticipant, catchAsync(MemberController.addMember))
router.post('/:teamId/positions', requireAuth, checkTeam, isTeamOwner, catchAsync(PositionController.createPosition))
router.post('/:teamId/stars', requireAuth, checkTeam, catchAsync(StarsController.toggle))

router.put('/:teamId', requireAuth, checkTeam, isTeamOwner, catchAsync(TeamController.updateTeam))
router.patch('/:teamId/archive', requireAuth, checkTeam, isTeamOwner, catchAsync(TeamController.archiveTeam))
router.put('/:teamId/members/:memberId', requireAuth, checkTeam, isTeamOwner, checkTeamMember, catchAsync(MemberController.updateMember))
router.put('/:teamId/positions/:positionId', requireAuth, checkTeam, isTeamOwner, checkPosition, catchAsync(PositionController.updatePosition))

router.delete('/:teamId/members/:memberId', requireAuth, checkTeam, isTeamOwner, checkTeamMember, catchAsync(MemberController.removeMember))
router.delete('/:teamId/positions/:positionId', requireAuth, checkTeam, isTeamOwner, checkPosition, catchAsync(PositionController.deletePosition))

module.exports = router
const Event = require('./modules/event/model')
const Participant = require('./modules/participant/model')
const Team = require('./modules/team/model')
const TeamMember = require('./modules/member/model')
const Position = require('./modules/position/model')

module.exports.checkEvent = async (req, res, next) => {
    const event = await Event.findOne({ slug: req.params.eventSlug })
    if (!event) {
        return res.status(404).json({ error: 'Event not found' })
    }
    res.locals.event = event
    await next()
}

module.exports.checkTeam = async (req, res, next) => {
    const team = await Team.findById(req.params.teamId)
    if (!team) {
        return res.status(404).json({ error: 'Team not found' })
    }
    res.locals.team = team
    await next()
}

module.exports.isTeamOwner = async (req, res, next) => {
    if (res.locals.team.ownerId !== req.user.id) {
        return res.status(403).send({ error: 'You do not have permission to do that!' })
    }
    await next()
}

module.exports.isParticipant = async (req, res, next) => {
    const participant = await Participant.findOne({
        eventId: res.locals.team.event,
        userId: req.query.userId,
    })
    if (!participant) {
        return res.status(404).json({ error: 'Participant not found' })
    }
    res.locals.participant = participant
    await next()
}

module.exports.checkTeamMember = async (req, res, next) => {
    const { memberId } = req.params
    const member = await TeamMember.findById(memberId)
    if (!member) {
        return res.status(404).json({ error: 'Team member not found' })
    }
    await next()
}

module.exports.checkPosition = async (req, res, next) => {
    const { positionId } = req.params
    const position = await Position.findById(positionId)
    if (!position) {
        return res.status(404).json({ error: 'Position not found' })
    }
    await next()
}



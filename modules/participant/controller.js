const Participant = require('./model.js')

module.exports.getParticipantsByEvent = async (req, res) => {
    const participants = await Participant.find(
            { eventId: res.locals.event.id }
        )
        .populate('profile')
    res.status(200).json(participants)
}

module.exports.showParticipant = async (req, res) => {
    const participant = await Participant.findOne(
            { userId: req.params.userId, event: res.locals.event._id }
        )
        .populate({
            path: 'profile',
            populate: {
                path: 'links projects',
            }
        })
        .populate('teams')
    res.status(200).json(participant)
}
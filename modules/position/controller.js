const Position = require('./model')
const Team = require('../team/model')

module.exports.createPosition = async (req, res) => {
    const team = res.locals.team
    const position = new Position(req.body.position)
    position.team = team._id
    position.eventId = team.event._id
    await position.save()
    team.positions.push(position)
    team.positionsCount++
    if (!team.lookingForMembers) {
        team.lookingForMembers = true
    }
    await team.save()
    res.status(201).json(position)
}

module.exports.updatePosition = async (req, res) => {
    const position = await Position.findByIdAndUpdate(
        req.params.positionId,
        {...req.body.position}
        )
    res.status(200).json(position)
}
  
module.exports.deletePosition = async (req, res) => {
    await Position.findByIdAndDelete(req.params.positionId)
    await Team.findByIdAndUpdate(
        req.params.teamId,
        { $inc: {'positionsCount': -1 } }
    )
    res.status(200).json({ message: 'Successfully deleted' })
}

const Stars = require('./model')
const Team = require('../team/model')

module.exports.toggle = async (req, res) => {
    const userId = req.user._id
    const team = res.locals.team
    const doc = await Stars.findOne({
        userId,
        event: team.event,
        teams: { $in: team._id }
    })
    let hasStarred = true;
    if (!doc) {
        await Stars.findOneAndUpdate(
            { userId, event: team.event },
            { $push: { teams: team._id } },
            { upsert: true}
        )
        await Team.findByIdAndUpdate(
            team.id,
            { $inc: { 'starsCount': 1 } }
        )
    } else {
        await Stars.findOneAndUpdate(
            { userId, event: team.event },
            { $pull: { teams: team._id } }
        )
        await Team.findByIdAndUpdate(
            team.id,
            { $inc: { 'starsCount': -1 } }
        )
        hasStarred = false
    }
    res.status(200).json(hasStarred)
}

module.exports.getTeamsByEvent = async (req, res) => {
    const doc = await Stars.findOne(
            {
                event: res.locals.event._id,
                userId: req.user._id,
            }
        )
        .populate('teams')
    const teams = doc.teams
    res.status(200).json(teams)
}
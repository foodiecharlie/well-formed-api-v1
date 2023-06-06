const Team = require('./model')
const Participant = require('../participant/model')
const TeamMember = require('../member/model')
const UserProfile = require('../profile/model')

module.exports.getTeamsByEvent = async (req, res) => {
    const teams = await Team.find(
            { event: res.locals.event._id }
        )
        .populate('event', 'name slug')
        .populate({
            path: 'members',
            populate: {
                path: 'profile',             
            }
        })
        .populate('positions', 'title roleCategory mustHaveSkills')
    res.status(200).json(teams)
}

module.exports.createTeam = async (req, res) => {
    const event = res.locals.event
    const participant = await Participant.findOne({
        eventId: event._id,
        userId: req.user.id,
    })
    const team = await Team.create({
        event: event._id,
        ownerId: req.user.id,
        membersCount: 1,
    })
    team.name = 'Team ' + team.id.slice(-6).toUpperCase()
    participant.teamCreator = true
    participant.teams.push(team)
    await participant.save()
    const profile = await UserProfile.findOne({ userId: req.user.id})
    const member = await TeamMember.create({
        team: team._id,
        userId: req.user.id,
        profile: profile._id,
        role: 'Team Lead',
        roleCategory: 'Other',    
    })
    team.members.push(member)
    await team.save()
    res.status(201).json(team)
}

module.exports.showTeam = async (req, res) => {
    const team = await Team.findById(req.params.teamId)
        .populate('event')
        .populate({
            path: 'members',
            populate: {
                path: 'profile',      
            },
        })
        .populate('positions')
    team.viewsCount++
    await team.save()
    res.status(200).json(team)
}

module.exports.updateTeam = async (req, res) => {
    const team = await Team.findByIdAndUpdate(
        req.params.teamId,
        {...req.body.team}
    )
    res.status(200).json(team)
}

module.exports.archiveTeam = async (req, res) => {
    const team = await Team.findByIdAndUpdate(
        req.params.teamId,
        { archived: true }
    )
    res.status(200).json(team)
}
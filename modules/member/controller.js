const TeamMember = require('./model')
const Team = require('../team/model')
const UserProfile = require('../profile/model')

module.exports.addMember = async (req, res) => {
    const {userId} = req.query
    const {team, participant}  = res.locals
    const profile = await UserProfile.findOne({ userId })
    const member = await TeamMember.create({
        team: team._id,
        userId,
        profile: profile._id,
        role: req.body.member.role,
        roleCategory: req.body.member.roleCategory,    
    })
    team.members.push(member)
    team.membersCount++
    await team.save()
    participant.lookingForATeam = false
    participant.teams.push(team)
    await participant.save()
    res.status(200).json(member)
}

module.exports.showMember = async (req, res) => {
    const member = await TeamMember.findById(req.params.memberId)
        .populate('team')
        .populate({
            path: 'profile',
            populate: {
                path: 'links projects',
            }
        })
    res.status(200).json(member)
}

module.exports.updateMember = async (req, res) => {
    const member = await TeamMember.findByIdAndUpdate(
        req.params.memberId,
        {...req.body.member}
    )
    res.status(200).json(member)
}
  
module.exports.removeMember = async (req, res) => {
    await TeamMember.findByIdAndDelete(req.params.MemberId)
    await Team.findByIdAndUpdate(
        req.params.teamId,
        { $inc: {'membersCount': -1 } }
    )
    res.status(200).json({ message: 'Successfully removed' })
}

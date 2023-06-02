const User = require('./model')
const Participant = require('../participant/model')
const UserProfile = require('../profile/model')

module.exports.signUp = async (req, res) => {
    const { email, code, password, lookingForATeam, roleCategoriesLookingFor } = req.body.user
    const participant = await Participant.findOne({ email, code })
    if (!participant) {
        return res.status(404).json({ error: 'Invalid invite code' })
    }
    const user = await User.create({ 
        email: email.toLowerCase(), 
        password,
    })
    const profile = await UserProfile.create({
        userId: user.id,
        displayName: participant.name
    })
    participant.claimed = true
    participant.userId = user.id
    participant.profile = profile._id
    participant.lookingForATeam = lookingForATeam
    participant.roleCategoriesLookingFor = roleCategoriesLookingFor
    await participant.save()
    return res.status(201).json(user)
}
  
module.exports.signIn = (req, res) => {
    res.status(200).json(req.user.toAuthJSON())
}

module.exports.getCurrentUser = (req, res) => {
    res.status(200).json(req.user)
}





  

 



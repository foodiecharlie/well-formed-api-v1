const UserProfile = require('./model')

module.exports.showProfile = async (req, res) => {
    const profile = await UserProfile.findOne({ userId: req.user._id })
        .populate('links projects')
    return res.status(200).json(profile)
}

module.exports.updateProfile = async (req, res) => {
    const profile = await UserProfile.findOneAndUpdate(
        { userId: req.user._id },
        {...req.body.profile}
    )
    return res.status(200).json(profile)
}

module.exports.archiveProfile = async (req, res) => {
    const profile = await UserProfile.findOneAndUpdate(
        { userId: req.user._id },
        { archived: true }
    )
    return res.status(200).json(profile)
}

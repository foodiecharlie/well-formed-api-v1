const Link = require('./model')
const UserProfile = require('../profile/model')

module.exports.createLink = async (req, res) => {
    const profile = await UserProfile.findOne({ userId: req.user._id })
    const link = await Link.create(req.body.link)
    profile.links.push(link)
    await profile.save()
    res.status(201).json(link)
}

module.exports.updateLink = async (req, res) => {
    const link = await Link.findByIdAndUpdate(
        req.params.linkId,
        {...req.body.link}
        )
    res.status(200).json(link)
}
  
module.exports.deleteLink = async (req, res) => {
    const { linkId } = req.params
    await UserProfile.findOneAndUpdate(
        { userId: req.user._id },
        { $pull: { links: linkId } }
    )
    await Link.findByIdAndDelete(linkId)
    res.status(200).json({ message: 'Successfully deleted' })
}


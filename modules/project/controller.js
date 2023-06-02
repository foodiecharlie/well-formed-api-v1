const Project = require('./model')
const UserProfile = require('../profile/model')

module.exports.createProject = async (req, res) => {
    const profile = await UserProfile.findOne({ userId: req.user._id })
    const project = await Project.create(req.body.project)
    profile.projects.push(project)
    await profile.save()
    res.status(201).json(project)
}

module.exports.updateProject = async (req, res) => {
    const project = await Project.findByIdAndUpdate(
        req.params.projectId,
        {...req.body.project}
        )
    res.status(200).json(project)
}
  
module.exports.deleteProject = async (req, res) => {
    const { projectId } = req.params
    await UserProfile.findOneAndUpdate(
        { userId: req.user._id },
        { $pull: { links: projectId } }
    )
    await Project.findByIdAndDelete(projectId)
    res.status(200).json({ message: 'Successfully deleted' })
}

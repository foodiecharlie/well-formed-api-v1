const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    hackathonProject: {
        type: Boolean,
        required: true,
    },
    tagline: {
        type: String,
        default: 'An example tagline',
    },
    role: {
        type: String,
        required: true,
    },
    roleCategory: {
        type: String,
        required: true,
        enum: ['Engineering', 'Design', 'Business', 'Other'],
    },
    contribution: {
        type: String,
        default: 'An example contribution description',
    },
    skills: {
        type: [String],
        default: ['Skill A','Skill B','Skill C'],
    },
})

ProjectSchema.set('timestamps', true)

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
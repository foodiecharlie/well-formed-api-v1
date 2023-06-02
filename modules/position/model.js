const mongoose = require('mongoose')

const PositionSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
        select: false,
    },
    eventId: {
        type: String,
        required: true,
        select: false,
    },
    title: {
        type: String,
        required: true,
    },
    roleCategory: {
        type: String,
        required: true,
        enum: ['Engineering', 'Design', 'Business', 'Other'],
    },
    description: {
        type: String,
        default: 'An example description',
    },
    mustHaveSkills: {
        type: [String],
        default: ['Skill A','Skill B','Skill C'],
    },
    niceToHaveSkills: {
        type: [String],
        default: ['Skill D','Skill E','Skill F'],
    },
})

PositionSchema.set('timestamps', true)

const Position = mongoose.model('Position', PositionSchema)

module.exports = Position


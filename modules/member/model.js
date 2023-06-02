const mongoose = require('mongoose')

const TeamMemberSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserProfile',
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
})

TeamMemberSchema.set('timestamps', true)

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema)

module.exports = TeamMember
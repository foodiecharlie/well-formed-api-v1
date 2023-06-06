const mongoose = require('mongoose')

const ParticipantSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        select: false,
    },
    code: {
        type: String,
        select: false,
    },
    claimed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
    },
    teamCreator: {
        type: Boolean,
        default: false,
    },
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        }
    ],
    lookingForATeam: {
        type: Boolean,
        default: false,
    },
    roleCategoriesLookingFor: [
        {
            type: String,
            enum: ['Engineering', 'Design', 'Business', 'Other'],
        }
    ],
})

ParticipantSchema.set('timestamps', true)

const Participant = mongoose.model('Participant', ParticipantSchema)

module.exports = Participant
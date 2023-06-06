const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    },
    ownerId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    avatarUrl: {
        type: String,
        default: 'https://joeschmoe.io/api/v1/random'
    },
    tagline: {
        type: String,
        default: 'An example tagline',
    },
    imageUrl: {
        type: String,
        default: './default_team_thumbnail.jpg',
    },
    idea: {
        type: String,
        default: 'An example idea pitch',
    },
    membersCount: {
        type: Number,
        default: 0,
    },
    positionsCount: {
        type: Number,
        default: 0,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    starsCount: {
        type: Number,
        default: 0,
    },
    lookingForMembers: {
        type: Boolean,
        default: false,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TeamMember',
        }
    ],
    positions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Position',
        }
    ],
    archived: {
        type: Boolean,
        default: false,
    },
})

TeamSchema.set('timestamps', true)

const Team = mongoose.model('Team', TeamSchema)

module.exports = Team
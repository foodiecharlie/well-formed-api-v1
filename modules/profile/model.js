const mongoose = require('mongoose')

const UserProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    discordUsername: {
        type: String,
        default: 'Discord Username'
    },
    avatarUrl: {
        type: String,
        default: 'https://joeschmoe.io/api/v1/random'
    },
    headline: {
        type: String,
        default: 'An example headline',
    },
    location: {
        type: String,
        default: 'Location',
    },
    bio: {
        type: String,
        default: 'An example bio',
    },
    background: [
        {
            type: String,
            enum: ['Engineering', 'Design', 'Business', 'Other'],
        }
    ],
    topSkills: {
        type: [String],
        default: ['Skill A','Skill B','Skill C'],
    },
    links: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Link',
        }
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        }
    ],
    archived: {
        type: Boolean,
        default: false,
    },
})

UserProfileSchema.set('timestamps', true)

const UserProfile = mongoose.model('UserProfile', UserProfileSchema)

module.exports = UserProfile
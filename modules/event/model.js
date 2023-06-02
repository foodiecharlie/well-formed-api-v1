const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    logoUrl: {
        type: String,
        default: 'https://example-hackathon.com/logo',
    },
    eventType: {
        type: String,
        enum: ['Physical', 'Online', 'Hybrid'],
    },
    tagline: {
        type: String,
        default: 'An example tagline',
    },
    websiteUrl: {
        type: String,
        default: 'https://example-hackathon.com',
    },
    discordServerUrl: {
        type: String,
        default: 'https://discord.com/invite/example-hackathon'
    },
    imageUrl: {
        type: String,
        default: 'https://source.unsplash.com/random',
    },
    location: {
        type: String,
        default: 'Location',
    },
    timezone: {
        type: String,
        default: 'Timezone',
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    description: {
        type: String,
        default: 'An example description',
    },
})

EventSchema.set('timestamps', true)

const Event = mongoose.model('Event', EventSchema)

module.exports = Event
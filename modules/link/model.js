const mongoose = require('mongoose')

const LinkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        default: 'https://www.a.team/',
    },
    tagline: {
        type: String,
        default: 'Build great things with great teams',
    },
})

LinkSchema.set('timestamps', true)

const Link = mongoose.model('Link', LinkSchema)

module.exports = Link
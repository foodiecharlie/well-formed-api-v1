const mongoose = require('mongoose')

const StarsSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    },
    teams: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        }
    ],
})

StarsSchema.set('timestamps', true)

const Stars = mongoose.model('Stars', StarsSchema)

module.exports = Stars
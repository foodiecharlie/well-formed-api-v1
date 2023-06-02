const Event = require('./model')

module.exports.getAllEvents = async (req, res) => {
    const events = await Event.find({})
        .sort({ createdAt: -1 })
        .exec()   
    res.status(200).json(events)
}

module.exports.showEvent = async (req, res) => {
    const event = await Event.findById(res.locals.event._id)
        .select('+description +imageUrl')
    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
}





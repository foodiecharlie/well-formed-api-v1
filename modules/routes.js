const authRouter = require('./auth/routes')
const profileRouter = require('./profile/routes')
const eventRouter = require('./event/routes')
const teamRouter = require('./team/routes')

module.exports = app => {
    app.get('/api/v1', (req, res) => {
        res.status(200).json({ message: 'Awesome Hackathon! Well-formed Team!' })
    })
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/profile', profileRouter)
    app.use('/api/v1/events', eventRouter)
    app.use('/api/v1/teams', teamRouter)
}
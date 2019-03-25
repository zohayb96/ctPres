const router = require('express').Router()
module.exports = router

// create api routes to access data for example at
// localhost:8080/api/entries ect...
router.use('/users', require('./users'))
router.use('/entries', require('./entries'))
router.use('/events', require('./events'))
router.use('/tasks', require('./tasks'))
router.use('/reminders', require('./reminders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

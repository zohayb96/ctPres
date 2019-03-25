// api/events.js
const router = require('express').Router()
const {Events} = require('../db/models')

// matches GET requests to /api/entries/
router.get('/', async function(req, res, next) {
  try {
    const entries = await Events.findAll()
    res.json(entries)
  } catch (err) {
    next(err)
  }
})

// matches POST requests to /api/events/
router.post('/', async function(req, res, next) {
  try {
    const CreatedEvent = await Events.create(req.body)
    res.json(CreatedEvent)
  } catch (error) {
    next(error)
  }
})

// matches PUT requests to /api/events/:eventId
router.put('/:eventId', async function(req, res, next) {
  /* etc */
  try {
    const event = await Events.findOne({
      where: {
        id: req.params.eventId
      }
    })
    event.update(req.body)
    res.json(event)
  } catch (error) {
    next(error)
  }
})

// matches DELETE requests to /api/events/:eventId
router.delete('/:eventId', function(req, res, next) {
  /* etc */
})

module.exports = router

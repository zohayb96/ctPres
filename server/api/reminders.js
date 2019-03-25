// api/reminders.js
const router = require('express').Router()
const {Reminder} = require('../db/models')

// matches GET requests to /api/entries/
router.get('/', async function(req, res, next) {
  try {
    const entries = await Reminder.findAll()
    res.json(entries)
  } catch (err) {
    next(err)
  }
})
// matches POST requests to /api/reminders/
router.post('/', async function(req, res, next) {
  try {
    const createdReminder = await Reminder.create(req.body)
    res.json(createdReminder)
  } catch (error) {
    next(error)
  }
})
// matches PUT requests to /api/reminders/:reminderId
router.put('/:reminderId', async function(req, res, next) {
  /* etc */
  try {
    const reminder = await Reminder.findOne({
      where: {
        id: req.params.reminderId
      }
    })
    reminder.update(req.body)
    res.json(reminder)
  } catch (error) {
    next(error)
  }
})
// matches DELETE requests to /api/reminders/:reminderId
router.delete('/:reminderId', async function(req, res, next) {
  try {
    const destroyedReminder = await Reminder.destroy({
      where: {
        id: req.params.reminderId
      }
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router

// api/entries.js
const router = require('express').Router()
const {Entries, Task, Events, Reminder} = require('../db/models')

// matches GET requests to /api/entries/
router.get('/', async function(req, res, next) {
  try {
    const entries = await Entries.findAll({
      include: [{model: Reminder}, {model: Events}]
    })
    res.json(entries)
  } catch (err) {
    next(err)
  }
})
// matches POST requests to /api/entries/
router.post('/', async function(req, res, next) {
  try {
    const entry = await Entries.create(req.body)
    res.json(entry)
  } catch (error) {
    res.sendStatus(500)
    next(error)
  }
})

router.get('/:id', async function(req, res, next) {
  const user = req.params.id
  try {
    const entries = await Entries.findAll({
      include: [{model: Reminder}, {model: Events}, {model: Task}],
      where: {
        userId: user
      }
    })
    res.json(entries)
  } catch (err) {
    next(err)
  }
})
// matches DELETE requests to /api/entries/:entryId
router.delete('/:entryId', async function(req, res, next) {
  try {
    const destroyedTask = await Task.destroy({
      where: {
        entryId: req.params.entryId
      }
    })
    const destroyedEvents = await Events.destroy({
      where: {
        entryId: req.params.entryId
      }
    })
    const destroyedEntry = await Entries.destroy({
      where: {
        id: req.params.entryId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:entryId', async function(req, res, next) {
  /* etc */
  try {
    const entry = await Entries.findOne({
      where: {
        id: req.params.entryId
      }
    })
    entry.update(req.body)
    res.json(entry)
  } catch (error) {
    next(error)
  }
})

module.exports = router

// api/tasks.js
const router = require('express').Router()
const {Task, Entries} = require('../db/models')

// matches GET requests to /api/entries/
router.get('/', async function(req, res, next) {
  try {
    const entries = await Task.findAll()
    res.json(entries)
  } catch (err) {
    next(err)
  }
})

// matches POST requests to /api/tasks/
router.post('/', async function(req, res, next) {
  try {
    const CreatedEvent = await Task.create(req.body)
    res.json(CreatedEvent)
  } catch (error) {
    next(error)
  }
})

// matches PUT requests to /api/tasks/:taskId
router.put('/:taskId', async function(req, res, next) {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.taskId
      }
    })
    task.update(req.body)
    res.json(task)
  } catch (error) {
    next(error)
  }
})
// matches DELETE requests to /api/tasks/:taskId
router.delete('/:taskId', function(req, res, next) {
  /* etc */
})

module.exports = router

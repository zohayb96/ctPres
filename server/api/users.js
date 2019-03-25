const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/leaderboard', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'points'],
      order: [['points', 'DESC']],
      limit: 10
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'points'],
      order: [['points', 'DESC']]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async function(req, res, next) {
  try {
    const editUser = await User.findOne({
      where: {
        id: req.params.userId
      }
    })
    console.log(req.body)
    editUser.update(req.body)
    res.json(editUser)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:userid', async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: {
        id: req.params.userid
      },
      attributes: ['id', 'username', 'points']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

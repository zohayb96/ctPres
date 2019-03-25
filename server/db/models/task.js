const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  deadlineDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Task

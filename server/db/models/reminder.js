const Sequelize = require('sequelize')
const db = require('../db')

const Reminder = db.define('reminder', {
  reminderDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  reminderNote: {
    type: Sequelize.STRING
  }
})

module.exports = Reminder

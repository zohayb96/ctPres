const Sequelize = require('sequelize')
const db = require('../db')

const Events = db.define('event', {
  eventStartDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  eventEndDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING
  }
})

module.exports = Events

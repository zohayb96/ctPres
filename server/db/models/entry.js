const Sequelize = require('sequelize')
const db = require('../db')

const Entries = db.define('entry', {
  entryName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  entryDescription: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Entries

const db = require('./db')

// register models
require('./models')

// register models
const {User, Entries, Events, Reminder, Task} = require('./models/')

// Establish assosciations
User.hasMany(Entries)
Entries.hasMany(Reminder)
Entries.hasOne(Events)
Entries.hasOne(Task)

module.exports = db

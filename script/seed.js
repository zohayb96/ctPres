'use strict'

const db = require('../server/db')
const {User, Events, Task, Entries, Reminder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.bulkCreate([
      {username: 'zs', password: '123', points: 100},
      {username: 'ya', password: '123', points: 300},
      {username: 'bb', password: '123', points: 30},
      {username: 'jn', password: '123', points: 6000}
    ])
  ])

  const entries = await Promise.all([
    Entries.bulkCreate([
      {
        entryName: 'EntryName Test',
        entryDescription: 'EntryDescription Test',
        userId: 1
      },
      {
        entryName: 'EntryName Test',
        entryDescription: 'EntryDescription Test',
        userId: 2
      }
    ])
  ])

  const events = await Promise.all([
    Events.create({
      entryId: 1,
      location: 'test location',
      eventStartDate: Date.now(),
      eventEndDate: Date.now()
    })
  ])

  const tasks = await Promise.all([
    Task.create({
      entryId: 1,
      complete: false,
      deadlineDate: Date.now()
    })
  ])

  const reminders = await Promise.all([
    Reminder.bulkCreate([
      {
        entryId: 1,
        reminderNote: 'Test Reminder Note',
        reminderDate: Date.now()
      },
      {
        entryId: 2,
        reminderNote: 'Test Reminder Note #2',
        reminderDate: Date.now()
      }
    ])
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${entries.length} entries`)
  console.log(`seeded ${events.length} events`)
  console.log(`seeded ${tasks.length} tasks`)
  console.log(`seeded ${reminders.length} reminders`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

module.exports = seed

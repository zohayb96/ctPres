import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
var moment = require('moment')
import {Link} from 'react-router-dom'
import {DayPilot, DayPilotMonth, DayPilotNavigator} from 'daypilot-pro-react'

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewState: 'list',
      displayDataType: 'both',
      tasks: [],
      events: [],
      entries: [],
      leaderboard: [],
      viewReminders: false,
      reminders: [],
      startDate: DayPilot.Date.today(),
      eventEndSpec: 'Date',
      currentUser: {}
    }
    this.deleteSelected = this.deleteSelected.bind(this)
    this.viewLeaderBoard = this.viewLeaderBoard.bind(this)
  }

  async componentDidMount() {
    const allEntries = await axios.get(
      `http://localhost:8080/api/entries/${this.props.user.id}`
    )
    const currentUser = await axios.get(
      `http://localhost:8080/api/users/${this.props.user.id}`
    )
    const topUsers = await axios.get(
      `http://localhost:8080/api/users/leaderboard`
    )

    this.setState({
      entries: allEntries.data,
      leaderboard: topUsers.data,
      currentUser: currentUser.data,
      events: [
        {
          id: 1,
          text: 'Clean my room. Its really messy',
          start: '2019-03-25',
          end: '2019-03-26'
        },
        {
          id: 2,
          text: 'Dry clean my suit',
          start: '2019-03-26',
          end: '2019-03-26'
        },
        {
          id: 1,
          text: 'Work On Presentation',
          start: '2019-03-25',
          end: '2019-03-26'
        },
        {
          id: 1,
          text: 'Submit Assignment',
          start: '2019-03-25',
          end: '2019-03-26'
        },
        {
          id: 1,
          text: 'Vintage Clothing Sale',
          start: '2019-03-25',
          end: '2019-03-26'
        }
      ]
    })
  }

  async deleteSelected(entryId, entries) {
    await axios.delete(`/api/entries/${entryId}`)
    const remainingEntries = entries.filter(entry => entry.id !== entryId)
    this.setState({
      entries: remainingEntries
    })
  }

  async deleteReminder(reminderId, entries) {
    await axios.delete(`/api/reminders/${reminderId}`)
    const remainingReminders = entries.filter(entry =>
      entry.reminders.filter(reminder => reminder.id !== reminderId)
    )
    this.setState({
      entries: remainingReminders
    })
  }

  // VIEW users function in class diagram - changed to help code readability.

  viewLeaderBoard() {
    this.setState({
      displayDataType: 'leaderboard'
    })
    console.log(this.state)
  }

  async completeTask(taskId, task) {
    console.log(taskId, task.complete, this.props.user.id)
    try {
      const res = await axios.put(`/api/tasks/${taskId}`, {
        complete: !task.complete
      })
      this.props.user.points = this.props.user.points + 10
      const allEntries = await axios.get(
        `http://localhost:8080/api/entries/${this.props.user.id}`
      )
      const editedUser = await axios.put(`/api/users/${this.props.user.id}`, {
        points: this.props.user.points
      })
      const topUsers = await axios.get(`http://localhost:8080/api/users`)
      this.setState({
        entries: allEntries.data,
        leaderboard: topUsers.data,
        currentUser: editedUser.data
      })
      console.log('STATE: ', this.state.leaderboard)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    var {...config} = this.state
    const toggleList = () => {
      this.setState({
        viewState: 'list'
      })
    }

    const toggleCalendar = () => {
      this.setState({
        viewState: 'calendar'
      })
    }

    // getReminders
    const getReminders = () => {
      console.log('showReminder pressed ')
      this.setState(prevState => ({
        viewReminders: !prevState.viewReminders
      }))
      console.log(this.state)
    }

    const showEvents = () => {
      this.setState({
        displayDataType: 'events'
      })
      console.log(this.state)
    }

    const showTasks = () => {
      this.setState({
        displayDataType: 'tasks'
      })
      console.log(this.state)
    }

    const showBoth = () => {
      this.setState({
        displayDataType: 'both'
      })
      console.log(this.state)
    }

    const {username, userpoints} = this.props

    return (
      <div className="userHome">
        <h3>
          Welcome {username}! {this.state.currentUser.points} points
        </h3>
        <div>
          <div className="calendar">
            <div className="ui secondary menu">
              <button
                className="ui lightRed button"
                type="button"
                onClick={() => showEvents()}
              >
                Events
              </button>
              <button
                className="ui red button"
                type="button"
                onClick={() => showTasks()}
              >
                Tasks
              </button>
              <button
                className="ui darkRed button"
                type="button"
                onClick={() => showBoth()}
              >
                Events + Tasks
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => toggleCalendar()}
              >
                Calendar View
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => toggleList()}
              >
                List View
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => getReminders()}
              >
                Toggle Reminders
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => this.viewLeaderBoard()}
              >
                View LeaderBoard
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => this.viewLeaderBoard()}
              >
                <Link to="/addtask">Add Task</Link>
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => this.viewLeaderBoard()}
              >
                <Link to="/addevent">Add Event</Link>
              </button>
              <button
                className="ui white button"
                type="button"
                onClick={() => this.viewLeaderBoard()}
              >
                <Link to="/addreminder">Add Reminder</Link>
              </button>
            </div>
          </div>
        </div>
        {this.state.viewState === 'calendar' ? (
          <div>
            <h1>Calendar</h1>
            <DayPilotNavigator
              selectMode="month"
              cellWidth={30}
              cellHeight={30}
              dayHeaderHeight={30}
              titleHeight={30}
              showMonths={1}
              skipMonths={1}
              onTimeRangeSelected={args => {
                this.setState({
                  startDate: args.day
                })
                console.log('PRESSED', this.state.startDate)
              }}
            />
            <DayPilotMonth
              {...config}
              ref={component => {
                this.calendar = component && component.control
              }}
            />
          </div>
        ) : (
          <div />
        )}
        {this.state.displayDataType === 'tasks' ? (
          this.state.entries.map(data => {
            return (
              <div className="item" key={data.id}>
                {data.task ? (
                  <div className="ui celled list">
                    <div className="item">
                      <div className="right floated content">
                        {data.task.complete === true ? (
                          <div />
                        ) : (
                          <div
                            className="ui button"
                            onClick={() =>
                              this.completeTask(data.task.id, data.task)
                            }
                          >
                            Complete
                          </div>
                        )}
                        <div
                          className="ui button"
                          onClick={() =>
                            this.deleteSelected(data.id, this.state.entries)
                          }
                        >
                          Remove
                        </div>
                        <Link
                          to={{
                            pathname: '/edittask',
                            state: {
                              data: data
                            }
                          }}
                        >
                          Edit
                        </Link>
                      </div>
                      <div className="header">{data.entryName}</div>
                      <div className="content">{data.entryDescription},</div>
                      <div className="content">
                        Deadline Date:{' '}
                        {moment(data.task.deadlineDate).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </div>
                      <div className="content">
                        Complete: {data.task.complete.toString()}
                      </div>
                      <div>
                        <div className="header">
                          No. of Reminders {data.reminders.length}
                        </div>
                        {this.state.viewReminders === false ? (
                          data.reminders.map(reminder => {
                            return (
                              <div key={reminder.id}>
                                <div className="content">
                                  Reminder Date:{' '}
                                  {moment(reminder.reminderDate).format(
                                    'MMMM Do YYYY, h:mm:ss a'
                                  )};
                                </div>
                                <div className="content">
                                  Reminder Note: {reminder.reminderNote}
                                </div>
                                <div
                                  className="ui button"
                                  onClick={() =>
                                    this.deleteReminder(
                                      reminder.id,
                                      this.state.entries
                                    )
                                  }
                                >
                                  Remove Reminder
                                </div>
                                <button
                                  className="ui white button"
                                  type="button"
                                >
                                  <Link
                                    to={{
                                      pathname: '/editreminder',
                                      state: {
                                        remId: reminder.id
                                      }
                                    }}
                                  >
                                    Edit Reminder
                                  </Link>
                                </button>
                              </div>
                            )
                          })
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            )
          })
        ) : this.state.displayDataType === 'events' ? (
          this.state.entries.map(data => {
            return (
              <div className="item" key={data.id}>
                {data.event ? (
                  <div className="ui celled list">
                    <div className="item">
                      <div className="right floated content">
                        <div
                          className="ui button"
                          onClick={() =>
                            this.deleteSelected(data.id, this.state.entries)
                          }
                        >
                          Remove
                        </div>
                        <Link
                          to={{
                            pathname: '/editevent',
                            state: {
                              data: data
                            }
                          }}
                        >
                          Edit
                        </Link>
                      </div>
                      <div className="header">{data.entryName}</div>
                      <div className="content">{data.entryDescription}</div>
                      <div className="content">
                        Start Date:{' '}
                        {moment(data.event.eventStartDate).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </div>
                      <div className="content">
                        End{' '}
                        {moment(data.event.eventEndDate).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </div>
                      <div className="content">
                        Location: {data.event.location}
                      </div>
                      <div className="header">
                        No. of Reminders {data.reminders.length}
                      </div>
                      {this.state.viewReminders === false ? (
                        data.reminders.map(reminder => {
                          return (
                            <div key={reminder.id}>
                              <div className="content">
                                Reminder Date:{' '}
                                {moment(reminder.reminderDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )};
                              </div>
                              <div className="content">
                                Reminder Note: {reminder.reminderNote}
                              </div>
                              <div
                                className="ui button"
                                onClick={() =>
                                  this.deleteReminder(
                                    reminder.id,
                                    data.reminders
                                  )
                                }
                              >
                                Remove Reminder
                              </div>
                              <button className="ui white button" type="button">
                                <Link
                                  to={{
                                    pathname: '/editreminder',
                                    state: {
                                      remId: reminder.id
                                    }
                                  }}
                                >
                                  Edit Reminder
                                </Link>
                              </button>
                            </div>
                          )
                        })
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            )
          })
        ) : this.state.displayDataType === 'both' ? (
          this.state.entries.map(data => {
            return (
              <div className="item" key={data.id}>
                <div className="ui list">
                  <div>
                    <div className="ui celled list">
                      {data.event ? (
                        <div className="item">
                          <div className="right floated content">
                            <div
                              className="ui button"
                              onClick={() =>
                                this.deleteSelected(data.id, this.state.entries)
                              }
                            >
                              Remove
                            </div>
                            <Link
                              to={{
                                pathname: '/editevent',
                                state: {
                                  data
                                }
                              }}
                            >
                              Edit
                            </Link>
                          </div>
                          <div className="header">{data.entryName}</div>
                          <div className="content">{data.entryDescription}</div>
                          {data.event ? (
                            <div>
                              <div className="content">
                                Start Date:{' '}
                                {moment(data.event.eventStartDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}
                              </div>
                              <div className="content">
                                End{' '}
                                {moment(data.event.eventEndDate).format(
                                  'MMMM Do YYYY, h:mm:ss a'
                                )}
                              </div>
                              <div className="content">
                                Location: {data.event.location}
                              </div>
                            </div>
                          ) : (
                            <div />
                          )}
                          <div className="header">
                            No. of Reminders {data.reminders.length}
                          </div>
                          {this.state.viewReminders === false ? (
                            data.reminders.map(reminder => {
                              return (
                                <div key={reminder.id}>
                                  <div className="content">
                                    Reminder Date:{' '}
                                    {moment(reminder.reminderDate).format(
                                      'MMMM Do YYYY, h:mm:ss a'
                                    )};
                                  </div>
                                  <div className="content">
                                    Reminder Note: {reminder.reminderNote}
                                  </div>
                                  <div
                                    className="ui button"
                                    onClick={() =>
                                      this.deleteReminder(
                                        reminder.id,
                                        this.state.entries
                                      )
                                    }
                                  >
                                    Remove Reminder
                                  </div>
                                  <button
                                    className="ui white button"
                                    type="button"
                                  >
                                    <Link
                                      to={{
                                        pathname: '/editreminder',
                                        state: {
                                          remId: reminder.id
                                        }
                                      }}
                                    >
                                      Edit Reminder
                                    </Link>
                                  </button>
                                </div>
                              )
                            })
                          ) : (
                            <div />
                          )}
                        </div>
                      ) : (
                        <div className="item">
                          <div className="right floated content">
                            {data.task.complete === true ? (
                              <div />
                            ) : (
                              <div
                                className="ui button"
                                onClick={() =>
                                  this.completeTask(data.task.id, data.task)
                                }
                              >
                                Complete
                              </div>
                            )}
                            <div
                              className="ui button"
                              onClick={() =>
                                this.deleteSelected(data.id, this.state.entries)
                              }
                            >
                              Remove
                            </div>
                            <Link
                              to={{
                                pathname: '/edittask',
                                state: {
                                  data
                                }
                              }}
                            >
                              Edit
                            </Link>
                          </div>
                          <div className="header">{data.entryName}</div>
                          <div className="content">{data.entryDescription}</div>
                          <div className="content">
                            Deadline Date:{' '}
                            {moment(data.task.deadlineDate).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )}
                          </div>
                          <div className="content">
                            Complete: {data.task.complete.toString()}
                          </div>
                          <div>
                            <div className="header">
                              No. of Reminders {data.reminders.length}
                            </div>
                            {this.state.viewReminders === false ? (
                              data.reminders.map(reminder => {
                                return (
                                  <div key={reminder.id}>
                                    <div className="content">
                                      Reminder Date:{' '}
                                      {moment(reminder.reminderDate).format(
                                        'MMMM Do YYYY, h:mm:ss a'
                                      )};
                                    </div>
                                    <div className="content">
                                      Reminder Note: {reminder.reminderNote}
                                    </div>
                                    <div
                                      className="ui button"
                                      onClick={() =>
                                        this.deleteReminder(
                                          reminder.id,
                                          this.state.entries
                                        )
                                      }
                                    >
                                      Remove Reminder
                                    </div>
                                    <button
                                      className="ui white button"
                                      type="button"
                                    >
                                      <Link
                                        to={{
                                          pathname: '/editreminder',
                                          state: {
                                            remId: reminder.id
                                          }
                                        }}
                                      >
                                        Edit Reminder
                                      </Link>
                                    </button>
                                  </div>
                                )
                              })
                            ) : (
                              <div />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : this.state.displayDataType === 'leaderboard' ? (
          this.state.leaderboard.map((user, index) => {
            return (
              <center key={user.id}>
                <div />
                <h1>
                  #{index + 1} {user.username} - Points:
                  {user.points}
                </h1>
              </center>
            )
          })
        ) : (
          <h1>hello</h1>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    username: state.user.username,
    user: state.user,
    userpoints: state.user.points
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  username: PropTypes.string
}

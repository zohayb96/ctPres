import React, {Component} from 'react'
import {connect} from 'react-redux'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class AddReminder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reminderNote: '',
      reminderDate: new Date(),
      entries: [],
      entryId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Get Entries()
  async componentDidMount() {
    const allEntries = await axios.get(
      `http://localhost:8080/api/entries/${this.props.user.id}`
    )
    this.setState({
      entries: allEntries.data
    })
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
    console.log(this.state)
  }

  handleEntryhange(event) {
    console.log(this.state)
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault()
    try {
      const createdReminder = await axios.post(`/api/reminders/`, {
        entryId: this.state.entryId,
        reminderNote: this.state.reminderNote,
        reminderDate: this.state.reminderDate
      })
      this.props.history.push('/home')
    } catch (err) {
      console.log(err)
    }
    console.log(this.state)
  }

  handleChangeDate(date) {
    this.setState({
      reminderDate: date
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div class="ui entry segment">
            <label>Task / Event</label>
            <form onSubmit={this.handleEntryChange}>
              <select onChange={this.handleChange} name="entryId">
                {this.state.entries.length === 0 ? (
                  <option>None</option>
                ) : (
                  this.state.entries.map(entry => (
                    <option
                      key={entry.id}
                      name="entryId"
                      id="entryId"
                      value={Number(entry.id)}
                    >
                      {entry.entryName}
                    </option>
                  ))
                )}
              </select>
            </form>
            <label name="name">Reminder Note</label>
            <input
              type="text"
              id="reminderNote"
              name="reminderNote"
              placeholder="Enter Reminder Note"
              value={this.state.reminderNote}
              onChange={this.handleChange}
              required
            />
            <label>Reminder Date</label>
            <DateTimePicker
              onChange={this.handleChangeDate}
              value={this.state.reminderDate}
            />
            <button type="submit" className="submit">
              Add Reminder
            </button>
          </div>  
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    username: state.user.username,
    user: state.user
  }
}

export default withRouter(connect(mapState)(AddReminder))

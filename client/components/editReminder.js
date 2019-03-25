import React, {Component} from 'react'
import {connect} from 'react-redux'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class EditReminder extends Component {
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
      const updatedReminder = await axios.put(
        `/api/reminders/${this.props.location.state.remId}`,
        {
          reminderNote: this.state.reminderNote,
          reminderDate: this.state.reminderDate
        }
      )
      this.props.history.push('/home')
    } catch (err) {
      console.log(err)
    }
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
              Edit Reminder
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

export default withRouter(connect(mapState)(EditReminder))

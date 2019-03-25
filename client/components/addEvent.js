import React, {Component} from 'react'
import {connect} from 'react-redux'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class AddEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entryName: '',
      entryDescription: '',
      location: '',
      startDate: new Date(),
      endDate: new Date()
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {}

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleSubmit(submitEvent) {
    console.log(this.state)
    submitEvent.preventDefault()
    try {
      const createdEntry = await axios.post(`/api/entries/`, {
        userId: this.props.user.id,
        entryName: this.state.entryName,
        entryDescription: this.state.entryDescription
      })
      const createdEvent = await axios.post(`/api/events/`, {
        entryId: createdEntry.data.id,
        location: this.state.location,
        eventStartDate: this.state.startDate,
        eventEndDate: this.state.endDate
      })
      this.props.history.push('/home')
    } catch (err) {
      console.log(err)
    }
  }

  handleChangeStartDate(date) {
    this.setState({
      startDate: date
    })
  }

  handleChangeEndDate(date) {
    this.setState({
      endDate: date
    })
  }

  render() {
    const {username} = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
         <div class="ui entry segment">
            <label name="name">Entry Name</label>
            <input
              type="text"
              id="entryName"
              name="entryName"
              placeholder="Enter Entry Name"
              value={this.state.entryName}
              onChange={this.handleChange}
              required
            />
            <label name="address">Entry Description</label>
            <input
              type="text"
              id="entryDescription"
              name="entryDescription"
              placeholder="Add entry Desctription"
              onChange={this.handleChange}
              value={this.state.entryDescription}
              required
            />
            <label name="address">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Add location of event"
              onChange={this.handleChange}
              value={this.state.location}
              required
            />
            <label>Event Start Date</label>
            <DateTimePicker
              onChange={this.handleChangeStartDate}
              value={this.state.startDate}
            />
            <label>Event End Date</label>
            <DateTimePicker
              onChange={this.handleChangeEndDate}
              value={this.state.endDate}
            />
            <button type="submit" className="submit">
              Add Event
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

export default withRouter(connect(mapState)(AddEvent))

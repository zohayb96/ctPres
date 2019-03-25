import React, {Component} from 'react'
import {connect} from 'react-redux'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entryName: '',
      entryDescription: '',
      deadlineDate: new Date()
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {}

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault()
    try {
      const createdEntry = await axios.post(`/api/entries/`, {
        userId: this.props.user.id,
        entryName: this.state.entryName,
        entryDescription: this.state.entryDescription
      })
      const createdTask = await axios.post(`/api/tasks/`, {
        entryId: createdEntry.data.id,
        deadlineDate: this.state.deadlineDate
      })
      this.props.history.push('/home')
    } catch (err) {
      console.log(err)
    }
  }

  handleChangeDate(date) {
    this.setState({
      deadlineDate: date
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="ui entry segment">
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
            <label>Deadline Date</label>
            <DateTimePicker
              onChange={this.handleChangeDate}
              value={this.state.deadlineDate}
            />
            <button type="submit" className="submit">
              Add Task
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

export default withRouter(connect(mapState)(AddTask))

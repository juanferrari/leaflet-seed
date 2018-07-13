import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder,deleteReminder } from 'actions/actions_reminder'
import '../../index.css'
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
      rerender:false
    }
  }

  addReminder(){
    console.log('this.state',this.state);
    this.props.addReminder(this.state.text)
    this.setState({rerender:!this.state.rerender})
  }

  deleteReminder(id){
    this.props.deleteReminder(id);
  }

  renderReminders(){
    const { reminders } = this.props;
    console.log('this.props',this.props);
    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map( reminder => {
            return(
              <li key={reminder.id} className='list-group-item'>
                <div className='list-item'>{reminder.text}</div>
                <div 
                  className="list-item delete-button"
                  onClick={()=> this.deleteReminder(reminder.id)}
                >
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    );
  }

  render() {
    const { Map: LeafletMap, TileLayer, Marker, Popup } = window.ReactLeaflet;
    return (
      <div className='App'>
        <div className='title'>
					Reminder Pro
        </div>
        <div className='form-inline reminder-form'>
          <div className='form-group'>
    		    <input
      			  className='form-control'
      			  placeholder='I have to...'
              onChange = {event => this.setState({text: event.target.value})}
            />
            <button
              type='button'
              className='btn btn-success'
              onClick = {()=> this.addReminder()}
            >
              Add Reminder
            </button>
            { this.renderReminders() }
          </div>
        </div>
        <div className='row'>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){

  return {
    reminders: state.reminders,
  }

}

export default connect(mapStateToProps,{ addReminder,deleteReminder })(App);

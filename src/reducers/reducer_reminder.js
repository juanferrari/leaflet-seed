import { 
  ADD_REMINDER,
  DELETE_REMINDER
} from 'actions/actions_reminder';

const reminder = (reminders,text) => {
  reminders.push( 
  {
    text: text,
    id: Math.random()
  })

  return reminders;
}

function deleteReminder(reminders,id){
  return reminders.filter(reminder => reminder.id != id);
}

const reminders = (state = {reminders:[]}, action) => {
  let reminders = [];
  switch (action.type) {
    case ADD_REMINDER:
      reminders = {...state, reminders:reminder(state.reminders,action.text)};
      return reminders;
    case DELETE_REMINDER:
      reminders = {...state, reminders:deleteReminder(state.reminders,action.id)}
      return reminders;
    default:
      return state;
  }
}

export default reminders;
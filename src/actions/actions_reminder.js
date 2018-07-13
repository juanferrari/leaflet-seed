export const ADD_REMINDER = 'ADD_REMINDER'
export const DELETE_REMINDER = 'DELETE_REMINDER'

export const addReminder = (text) => {
  const action = {
    type: ADD_REMINDER,
    text: text
  }
  return action
}

export const deleteReminder = (id) => {
  const action = {
    type: DELETE_REMINDER,
    id: id  
  }
  return action;
}


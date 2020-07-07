//update currentMessage state and  input value
export const onChangeMessageInput = (message:string) => {
  return {
    type: 'UPDATE_MESAGE_INPUT',
    payload: message
  }
}

//clears currentMessage state and input value
export const clearCurrentMessage = () => {
  return {
    type: 'CHAT_CLEAR_CURRENT_MESSAGE',
  }
}

// adds message Obj to messages list
export const addMessageToList = (message:string) => {
  return {
    type: 'CHAT_ADD_MESSAGE_TO_LIST',
    payload: message
  }
}

//clears all messages for the client
export const clearAllMessages = () => {
  return {
    type: 'CHAT_CLEAR_ALL_MESSAGES'
  }
}
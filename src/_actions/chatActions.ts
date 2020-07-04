export const onChangeMessageInput = (message:string) => {
  return {
    type: 'UPDATE_MESAGE_INPUT',
    payload: message
  }
}

export const clearCurrentMessage = () => {
  return {
    type: 'CHAT_CLEAR_CURRENT_MESSAGE',
  }
}

export const addMessageToList = (message:string) => {
  console.log('ADD MESSAGE', message);
  return {
    type: 'CHAT_ADD_MESSAGE_TO_LIST',
    payload: message
  }
}
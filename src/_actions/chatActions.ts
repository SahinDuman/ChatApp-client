import { Message, User } from '../models';

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
export const addMessageToList = (message:Message) => {
  return {
    type: 'CHAT_MESSAGE',
    payload: message
  }
}

export const adminMessageToList = (message:Message, users: User[]) => {
  return {
    type: 'CHAT_ADMIN_MESSAGE',
    payload: {message, users}
  }
}

//clears all messages for the client
export const clearAllMessages = () => {
  return {
    type: 'CHAT_CLEAR_ALL_MESSAGES'
  }
}
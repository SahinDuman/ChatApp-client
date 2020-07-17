import { Message, Users } from '../models';
import * as types from './chatActionsTypes';
//update currentMessage state and  input value
export const onChangeMessageInput = (message: string): types.OnChangeMessageInput => {
  return {
    type: types.UPDATE_MESSAGE_INPUT,
    payload: message
  }
}

//clears currentMessage state and input value
export const clearCurrentMessage = (): types.ClearCurrentMessage => {
  return {
    type: types.CHAT_CLEAR_CURRENT_MESSAGE,
  }
}

// adds message Obj to messages list
export const addMessageToList = (message: Message): types.AddMessageToList => {
  return {
    type: types.CHAT_MESSAGE,
    payload: message
  }
}

export const adminMessageToList = (message: Message, users: Users[]): types.AdminMessageToList => {
  return {
    type: types.CHAT_ADMIN_MESSAGE,
    payload: { message, users }
  }
}

//clears all messages for the client
export const clearAllMessages = (): types.ClearAllMessages => {
  return {
    type: types.CHAT_CLEAR_ALL_MESSAGES
  }
}
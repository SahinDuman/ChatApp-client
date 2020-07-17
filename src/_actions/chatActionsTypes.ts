import { Message, Users } from "../models";

export const UPDATE_MESSAGE_INPUT = 'UPDATE_MESSAGE_INPUT'; 
export const CHAT_CLEAR_CURRENT_MESSAGE = 'CHAT_CLEAR_CURRENT_MESSAGE';
export const CHAT_MESSAGE = 'CHAT_MESSAGE';
export const CHAT_ADMIN_MESSAGE = 'CHAT_ADMIN_MESSAGE';
export const CHAT_CLEAR_ALL_MESSAGES = 'CHAT_CLEAR_ALL_MESSAGES';

export interface OnChangeMessageInput {
  type: typeof UPDATE_MESSAGE_INPUT,
  payload: string
}

export interface ClearCurrentMessage {
  type: typeof CHAT_CLEAR_CURRENT_MESSAGE
}


export interface AddMessageToList {
  type: typeof CHAT_MESSAGE,
  payload: Message
}


export interface AdminMessageToList {
  type: typeof CHAT_ADMIN_MESSAGE,
  payload: {
    message: Message,
    users: Users[]
  }
}

export interface ClearAllMessages {
  type: typeof CHAT_CLEAR_ALL_MESSAGES
}

export type ChatActionsTypes = OnChangeMessageInput | ClearCurrentMessage | AddMessageToList | AdminMessageToList | ClearAllMessages;
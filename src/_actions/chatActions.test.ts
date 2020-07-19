import * as actions from './chatActions';
import * as types from './chatActionsTypes';
import { Message, Users } from '../models';

describe('Chat action testing', () => {
  test('Should create an action to update message input', () => {
    const payload = 'I am writing a message here';
    const expectedAction = {
      type: types.UPDATE_MESSAGE_INPUT,
      payload
    }

    expect(actions.onChangeMessageInput(payload)).toEqual(expectedAction);
  })

  test('Should create an action that clears currentMessage', () => {
    const expectedAction = { type: types.CHAT_CLEAR_CURRENT_MESSAGE };

    expect(actions.clearCurrentMessage()).toEqual(expectedAction);
  })

  test('Should create an action that adds message to allMessages', () => {
    const payload: Message = {
      name: 'Tumnus',
      message: 'This is a message',
      role: 'client'
    }
    const expectedAction = {
      type: types.CHAT_MESSAGE,
      payload
    }

    expect(actions.addMessageToList(payload)).toEqual(expectedAction);
  })

  test('Should create an action that adds message to list and updates allUsers', () => {
    const message: Message = {
      name: 'Aslan',
      message: 'This is a message from admin',
      role: 'admin'
    }
    const users: Users[] = [
      {
        name: 'Tumnus',
        id: '1'
      }, {
        name: 'Weasel',
        id: '2'
      }
    ];
    const payload = { message, users};

    const expectedAction = {
      type: types.CHAT_ADMIN_MESSAGE,
      payload
    }

    expect(actions.adminMessageToList(message, users)).toEqual(expectedAction);
  })

  test('Should create an action to clear all messages and reset state', () => {
    const expectedAction = {type: types.CHAT_CLEAR_ALL_MESSAGES};

    expect(actions.clearAllMessages()).toEqual(expectedAction);
  })
})
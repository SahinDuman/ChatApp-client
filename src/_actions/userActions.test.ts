import * as actions from './userActions';
import * as types from './userActionsTypes';

describe('User actions testing', () => {
  test('Should create an action to update name input', () => {
    const payload = 'Tumnus';
    const expectedAction = {
      type: types.UPDATE_NAME_INPUT,
      payload
    }
    expect(actions.onChangeNameInput(payload)).toEqual(expectedAction);
  })

  test('Should create an action to give user an id', () => {
    const payload = '1';
    const expectedAction = {
      type: types.USER_ADD_ID,
      payload
    }

    expect(actions.giveUserId(payload)).toEqual(expectedAction);
  })

  test('should create an action that updates infobox when user leaves chat', () => {
    const payload = 'You left the chat';
    const expectedAction = {
      type: types.USER_LEAVE_CHAT,
      payload
    }

    expect(actions.userLeaveChat(payload)).toEqual(expectedAction);
  })

  test('should create an action that updates infobox when user gets disconnected', () => {
    const payload = 'You got disconnected';
    const expectedAction = {
      type: types.USER_DISCONNECTED,
      payload
    }

    expect(actions.userDisconnected(payload)).toEqual(expectedAction);
  })

  test('should create an action that updates infobox if username is already taken', () => {
    const payload = 'Name is already taken';
    const expectedAction = {
      type: types.USER_ALREADY_EXISTS,
      payload
    }

    expect(actions.registerNameTaken(payload)).toEqual(expectedAction);
  })

  test('should create an action that changes enteredChat to true', () => {
    const payload = 'Tumnus';
    const expectedAction = {
      type: types.USER_REGISTERED,
      payload
    }

    expect(actions.registerNameSuccess(payload)).toEqual(expectedAction);
  })

  test('should create an action that updates infobox if client cant reach the server', () => {
    const payload = 'Could not connect to server';
    const expectedAction = {
      type: types.USER_DISCONNECTED,
      payload
    }

    expect(actions.registerNameFailed(payload)).toEqual(expectedAction);
  })

  test('should create an action that updates infobox when user types in an invalid name', () => {
    const payload = 'Name is invalid';
    const expectedAction = {
      type: types.USER_INVALID_NAME,
      payload
    }

    expect(actions.invalidName(payload)).toEqual(expectedAction);
  })

})
import userReducer from './userReducer';
import { User } from '../models';
import * as types from '../_actions/userActionsTypes';

const initialState:User = {
  name: '',
  id:'',
  infoBox: '',
  infoBoxClass: 'red', 
  enteredChat: false
}

const mockStateEx1:User = {
  name: 'Tumnus',
  id:'random_id',
  infoBox: '',
  infoBoxClass: 'red', 
  enteredChat: true
}

const mockStateEx2:User = {
  name: '-invalid-random_name',
  id:'',
  infoBox: '',
  infoBoxClass: 'red', 
  enteredChat: false
}

describe('User reducer testing', () => {
  let mockAction: any;
  let mockState: User = {...initialState};
  let state: User;

  test('action type UPDATE_NAME_INPUT correctly updates the name state', () => {
    mockAction = {
      type: types.UPDATE_NAME_INPUT, 
      payload: 'Tumnus'
    }

    state = userReducer(mockState, mockAction);

    expect(state.name).toBe('Tumnus');
    expect(state).toEqual({
      name: 'Tumnus',
      id:'',
      infoBox: '',
      infoBoxClass: 'red', 
      enteredChat: false
    })
  });

  test('action type USER_ADD_ID gives id to user', () => {
    mockAction = {
      type: types.USER_ADD_ID,
      payload: 'random_id'
    }

    state = userReducer(mockState, mockAction);

    expect(state.id).toBe('random_id');
    expect(state).toEqual({
      name: '',
      id:'random_id',
      infoBox: '',
      infoBoxClass: 'red', 
      enteredChat: true
    })
  })

  test('action type USER_LEAVE_CHAT to reset state and update infobox/infoboxClass states', () => {
    mockAction = {
      type: types.USER_LEAVE_CHAT,
      payload: 'You left the chat'
    }

    mockState = {...mockStateEx1}

    state = userReducer(mockState, mockAction);

    expect(state.infoBox).toBe('You left the chat');
    expect(state.infoBoxClass).toBe('white');
    expect(state).toEqual({
      name: '',
      id:'',
      infoBox: 'You left the chat',
      infoBoxClass: 'white', 
      enteredChat: false
    });
  })

  test('action type USER_ALREADY_EXISTS to reset state and update infobox', () => {
    mockAction = {
      type: types.USER_ALREADY_EXISTS,
      payload: 'Name already taken'
    }, 

    mockState = {...mockStateEx1};

    state = userReducer(mockState, mockAction);

    expect(state.infoBox).toBe('Name already taken');
    expect(state).toEqual({
      ...initialState,
      infoBox: 'Name already taken'
    })
  })

  test('action type USER_REGISTERED to update name, infobox and enteredChat', () => {
    mockAction = {
      type: types.USER_REGISTERED,
      payload: 'Tumnus'
    }

    mockState = {...mockStateEx1};

    state = userReducer(mockState, mockAction);

    expect(state.name).toBe('Tumnus');
    expect(state.enteredChat).toBeTruthy();
    expect(state).toEqual({
      name: 'Tumnus',
      id:'random_id',
      infoBox: '',
      infoBoxClass: 'red', 
      enteredChat: true
    })
  });

  test('action type USER_DISCONNECTED to reset state and update infobox state', () => {
    mockAction = {
      type: types.USER_DISCONNECTED,
      payload: 'Lost connection'
    }, 

    mockState = {...mockStateEx1};

    state = userReducer(mockState, mockAction);

    expect(state.infoBox).toBe('Lost connection');
    expect(state).toEqual({
      ...initialState,
      infoBox: 'Lost connection'
    })
  })

  test('action type USER_INVALID_NAME to reset state and update infobox state', () => {
    mockAction = {
      type: types.USER_INVALID_NAME,
      payload: 'Invalid name'
    }
    mockState = {...mockStateEx2};

    state = userReducer(mockState, mockAction);

    expect(state.infoBox).toBe('Invalid name');
    expect(state).toEqual({
      ...initialState,
      infoBox: 'Invalid name'
    })
  })

  test('type action that doesnt exist to return same state as before', () => {
    mockAction = {type: 'THIS_ACTION_DOESNT_EXIST'}

    mockState = {...mockStateEx1}

    state = userReducer(mockState, mockAction);

    expect(state).toEqual(mockState);
  })})
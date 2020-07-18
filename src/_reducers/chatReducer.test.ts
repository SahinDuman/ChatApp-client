import chatReducer from './chatReducer';
import { ChatState, Message } from '../models';
import * as types from '../_actions/chatActionsTypes';

const initialState: ChatState = {
  currentMessage: '',
  allMessages: [],
  allUsers: []
}

const mockStateEx1: ChatState = {
  currentMessage: 'Some text in current message',
  allMessages: [],
  allUsers: []
}

const mockStateEx2: ChatState = {
  currentMessage: 'Some text in current message',
  allMessages: [
    {
      name: 'Tumnus',
      message: 'I wrote something.',
      role: 'client'
    },
    {
      name: 'Weasel',
      message: 'I wrote something too',
      role: 'other'
    }
  ],
  allUsers: [
    {
      name: 'Tumnus',
      id: '1'
    },
    {
      name: 'Weasel',
      id: '2'
    }
  ]
}

const mockUserMessage: Message = {
  name: 'Fox',
  message: 'I am writing something about stuff here', 
  role: 'other'
}

const mockAdminMessage = {
  message: {
    name: 'Aslan',
    message: 'I am the admin',
    role: 'admin'
  }, 
  users: [
    {
      name:'Tumnus',
      id: '1'
    },
    {
      name:'Weasel',
      id: '2'
    },
    {
      name:'Fox',
      id: '3'
    }
  ]
}



describe('Chat reducer Testing', () => {
  let mockAction: any;
  let mockState: ChatState;
  let state: ChatState;

  beforeEach(() => {
    mockState = {...initialState};
  })

  test('action type UPDATE_MESSAGE_INPUT correctly updates currentMessage state', () => {
    mockAction = {
      type: types.UPDATE_MESSAGE_INPUT,
      payload: 'Writing a message here'
    }

    state = chatReducer(mockState, mockAction);

    expect(state.currentMessage).toBe('Writing a message here');
    expect(state).toEqual({
      ...initialState,
      currentMessage: 'Writing a message here'
    })
  })

  test('action type CHAT_CLEAR_CURRENT_MESSAGE to clear currentMessage state', () => {
    mockAction = {type: types.CHAT_CLEAR_CURRENT_MESSAGE};
    mockState = {...mockStateEx1};

    state = chatReducer(mockState, mockAction);

    expect(state.currentMessage).toBe('');
    expect(state).toEqual({
      ...mockState,
      currentMessage: ''
    })
  })

  test('action type CHAT_MESSAGE to update allMessages state', () => {
    mockAction = {
      type: types.CHAT_MESSAGE,
      payload: {...mockUserMessage}
    }

    mockState = {...mockStateEx2}

    state = chatReducer(mockState, mockAction);

    expect(state.allMessages).toEqual([...mockStateEx2.allMessages, mockUserMessage]);
  })

  test('action type CHAT_ADMIN_MESSAGE to update allMessages state and allUsers state', () => {
    mockAction = {
      type: types.CHAT_ADMIN_MESSAGE,
      payload: {...mockAdminMessage}
    }

    mockState = {...mockStateEx2};

    state = chatReducer(mockState, mockAction);

    expect(state.allMessages).toEqual([...mockStateEx2.allMessages, mockAdminMessage.message]);
    expect(state.allUsers).toEqual([...mockAdminMessage.users]);
    expect(state).toEqual({
      ...mockStateEx2,
      allMessages: [...mockStateEx2.allMessages, mockAdminMessage.message],
      allUsers: [...mockAdminMessage.users]
    })
  })

  test('type action CHAT_CLEAR_ALL_MESSAGES to reset state', () => {
    mockAction = { type: types.CHAT_CLEAR_ALL_MESSAGES }

    mockState = {...mockStateEx2};

    state = chatReducer(mockState, mockAction);

    expect(state).toEqual({...initialState})
  })
})
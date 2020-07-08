import { ChatState } from "../models";

const initialState:ChatState = {
  currentMessage: '',
  allMessages: [],
  allUsers: []
}

const chatReducer = (state:ChatState = initialState , action:any) => {
  switch (action.type) {
    case 'UPDATE_MESAGE_INPUT':
      state = {
        ...state,
        currentMessage: action.payload,
      }
      break;
    case 'CHAT_CLEAR_CURRENT_MESSAGE':
      state = {
        ...state,
        currentMessage: '',
      }
      break;
    case 'CHAT_MESSAGE':
      state = {
        ...state,
        allMessages: [...state.allMessages, action.payload]
      }
      break;
    case 'CHAT_ADMIN_MESSAGE':
      state = {
        ...state,
        allMessages: [...state.allMessages, action.payload.message],
        allUsers: [...action.payload.users]
      }
      break;
    case 'CHAT_CLEAR_ALL_MESSAGES':
      state = {
        ...initialState,
      }
      break;
  }
  return state;
}

export default chatReducer;
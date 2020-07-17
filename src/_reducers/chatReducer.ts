import { ChatState } from "../models";
import * as types from "../_actions/chatActionsTypes";

const initialState:ChatState = {
  currentMessage: '',
  allMessages: [],
  allUsers: []
}

const chatReducer = (state:ChatState = initialState , action:types.ChatActionsTypes): ChatState => {
  switch (action.type) {
    case types.UPDATE_MESSAGE_INPUT:
      state = {
        ...state,
        currentMessage: action.payload,
      }
      break;
    case types.CHAT_CLEAR_CURRENT_MESSAGE:
      state = {
        ...state,
        currentMessage: '',
      }
      break;
    case types.CHAT_MESSAGE:
      state = {
        ...state,
        allMessages: [...state.allMessages, action.payload]
      }
      break;
    case types.CHAT_ADMIN_MESSAGE:
      state = {
        ...state,
        allMessages: [...state.allMessages, action.payload.message],
        allUsers: [...action.payload.users]
      }
      break;
    case types.CHAT_CLEAR_ALL_MESSAGES:
      state = {
        ...initialState,
      }
      break;
  }
  return state;
}

export default chatReducer;
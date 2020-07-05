interface Message {
  user: string,
  message: string,
  role: string,
}

interface ChatState {
  currentMessage:string,
  allMessages: Message[]
}

 
const initialState:ChatState = {
  currentMessage: '',
  allMessages: []
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
    case 'CHAT_ADD_MESSAGE_TO_LIST':
      state = {
        ...state,
        allMessages: [...state.allMessages, action.payload]
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
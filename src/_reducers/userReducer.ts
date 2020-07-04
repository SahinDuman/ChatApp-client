interface User {
  name: string,
  id: string,
  error: boolean | string,
  enteredChat: boolean
}

const initialState:User = {
  name: '',
  id:'',
  error: false,
  enteredChat: false
}

const userReducer = (state:User = initialState , action:any) => {
  switch (action.type) {
    case 'UPDATE_NAME_INPUT':
      state = {
        ...state,
        name: action.payload,
        error: false,
        enteredChat: false
      }
      break;
    case 'USER_REGISTERED':
      state = {
        ...state,
        name: action.payload,
        error: false,
        enteredChat: true
      }
      break;
    case 'USER_ALREADY_EXISTS':
      state = {
        ...state,
        error: action.payload,
        enteredChat: false
      }
      break;
    case 'USER_ADD_ID':
      state = {
        ...state,
        id: action.payload,
        error: false,
        enteredChat: true
      }
      break;
      case 'USER_LEAVE_CHAT':
        state = {
          ...initialState,
        }
        break;
  }
  return state;
}

export default userReducer;
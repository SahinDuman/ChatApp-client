interface User {
  name: string,
  id: string,
  infoBox: boolean | string,
  infoBoxClass: string,
  enteredChat: boolean
}

const initialState:User = {
  name: '',
  id:'',
  infoBox: false,
  infoBoxClass: 'red', 
  enteredChat: false
}

const userReducer = (state:User = initialState , action:any) => {
  switch (action.type) {
    case 'UPDATE_NAME_INPUT':
      state = {
        ...state,
        name: action.payload,
        infoBox: false,
        enteredChat: false
      }
      break;
    case 'USER_REGISTERED':
      state = {
        ...state,
        name: action.payload,
        infoBox: false,
        enteredChat: true
      }
      break;
    case 'USER_ALREADY_EXISTS':
      state = {
        ...state,
        infoBox: action.payload,
        infoBoxClass: 'red',
        enteredChat: false
      }
      break;
    case 'USER_ADD_ID':
      state = {
        ...state,
        id: action.payload,
        infoBox: false,
        enteredChat: true
      }
      break;
      case 'USER_LEAVE_CHAT':
        state = {
          ...initialState,
          infoBox: action.payload,
          infoBoxClass: 'white'
        }
        break;
      case 'USER_DISCONNECTED':
        state = {
          ...initialState,
          infoBox: action.payload,
          infoBoxClass: 'red'
        }
        break;
      case 'USER_COULD_NOT_CONNECT':
        state = {
          ...initialState,
          infoBox: action.payload,
          infoBoxClass: 'red'
        }
        break;
  }
  return state;
}

export default userReducer;
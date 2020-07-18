import * as types from '../_actions/userActionsTypes';
import { User } from '../models';

const initialState:User = {
  name: '',
  id:'',
  infoBox: '',
  infoBoxClass: 'red', 
  enteredChat: false
}

const userReducer = (state:User = initialState , action: types.UserActionsType): User => {
  switch (action.type) {
    case types.UPDATE_NAME_INPUT:
      state = {
        ...state,
        name: action.payload,
        infoBox: '',
        enteredChat: false
      }
      break;
    case types.USER_REGISTERED:
      state = {
        ...state,
        name: action.payload,
        infoBox: '',
        enteredChat: true
      }
      break;
    case types.USER_ALREADY_EXISTS:
      state = {
        ...initialState,
        infoBox: action.payload,
      }
      break;
    case types.USER_INVALID_NAME:
      state = {
        ...initialState,
        infoBox: action.payload,
      }
      break;
    case types.USER_ADD_ID:
      state = {
        ...state,
        id: action.payload,
        infoBox: '',
        enteredChat: true
      }
      break;
      case types.USER_LEAVE_CHAT:
        state = {
          ...initialState,
          infoBox: action.payload,
          infoBoxClass: 'white'
        }
        break;
      case types.USER_DISCONNECTED:
        state = {
          ...initialState,
          infoBox: action.payload,
        }
        break;
  }
  return state;
}

export default userReducer;
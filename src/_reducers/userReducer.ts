interface User {
  name: string,
  error: boolean | string,
  enteredChat: boolean
}

const initialState:User = {
  name: '',
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
    case 'REGISTER_USER':
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
      
  }
  return state;
}

export default userReducer;
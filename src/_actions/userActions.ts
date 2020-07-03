import Axios from 'axios';
const ENDPOINT:string = 'http://localhost:5000/';

export const onChangeNameInput = (name:string) => {
  return {
    type: 'UPDATE_NAME_INPUT',
    payload: name
  }
}

export const registerName = (name:string) => {
  return (dispatch: (arg0: { type: string; payload: string; }) => void) => {
    Axios.post(ENDPOINT, {name})
    .then(res => {
      if(res.data.error) {
        dispatch({type: 'USER_ALREADY_EXISTS', payload: res.data.error})
        return;
      } 
      dispatch({type: 'REGISTER_USER', payload: res.data.name})
    })
  }
}


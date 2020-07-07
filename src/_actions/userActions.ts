import { ENDPOINT } from "../constants";
import Axios from "axios";

// updates name state and nickname input value
export const onChangeNameInput = (name:string) => {
  return {
    type: 'UPDATE_NAME_INPUT',
    payload: name
  }
}

//gives user socket id
export const giveUserId = (id:string) => {
  return {
    type: 'USER_ADD_ID',
    payload: id
  }
}

//sets infobox with right info
export const userLeaveChat = (reason:string) => {
  if(reason) {
    return {
      type: 'USER_LEAVE_CHAT',
      payload: reason
    }
  }
}

//sets infobox with right info
export const userDisconnected = (reason:string) => {
  if(reason) {
    return {
      type: 'USER_DISCONNECTED',
      payload: reason
    }
  }
}

//sends a post request to the server, to register name/user
export const registerName = (name:string) => {
  return  (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    Axios
      .post(ENDPOINT + 'register', {name})
      .then(res => {
      if(res.data.error) {
        dispatch({type: 'USER_ALREADY_EXISTS', payload: res.data.error})
        return;
      } 
      dispatch({type: 'USER_REGISTERED', payload: res.data.name})
      })
      .catch(err => {dispatch({type:'USER_DISCONNECTED' , payload: 'Sorry, could not connect to server'})})
  };
};

//sets infobox with right info
export const invalidName = (value:string) => {
  return {
    type: 'USER_INVALID_NAME',
    payload: value
  }
}


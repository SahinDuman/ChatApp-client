import { ENDPOINT } from "../constants";
import Axios from "axios";

export const onChangeNameInput = (name:string) => {
  return {
    type: 'UPDATE_NAME_INPUT',
    payload: name
  }
}

export const giveUserId = (id:string) => {
  return {
    type: 'USER_ADD_ID',
    payload: id
  }
}

export const userLeaveChat = (id:string) => {
  return {
    type: 'USER_LEAVE_CHAT',
  }
}


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
      });
  };
};



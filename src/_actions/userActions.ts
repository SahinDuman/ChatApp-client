import Axios from "axios";

import { ENDPOINT } from "../constants";
import * as types from './userActionsTypes';
import { Dispatch } from "redux";


// updates name state and nickname input value
export const onChangeNameInput = (name:string): types.OnChangeNameInput => {
  return {
    type: types.UPDATE_NAME_INPUT,
    payload: name
  }
}

//gives user socket id
export const giveUserId = (id:string): types.GiveUserId => {
  return {
    type: types.USER_ADD_ID,
    payload: id
  }
}

//sets infobox with right info
export const userLeaveChat = (reason:string):types.UserLeaveChat => {
    return {
      type: types.USER_LEAVE_CHAT,
      payload: reason
  }
}

//sets infobox with right info
export const userDisconnected = (reason:string):types.UserDisconnected => {
    return {
      type: types.USER_DISCONNECTED,
      payload: reason
  }
}

//sends a post request to the server, to register name/user
export const registerName = (name:string):any => {
  return  (dispatch: Dispatch<types.RegisterNameTypes>) => {
    Axios
      .post(ENDPOINT + 'register', {name})
      .then(res => {
      if(res.data.error) {
        dispatch({type: types.USER_ALREADY_EXISTS, payload: res.data.error})
        return;
      } 
      dispatch({type: types.USER_REGISTERED, payload: res.data.name})
      })
      .catch(err => {dispatch({type:types.USER_DISCONNECTED , payload: 'Sorry, could not connect to server'})})
  };
};

//sets infobox with right info
export const invalidName = (value:string): types.InvalidName => {
  return {
    type: types.USER_INVALID_NAME,
    payload: value
  }
}
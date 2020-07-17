export const UPDATE_NAME_INPUT = 'UPDATE_NAME_INPUT';
export const USER_ADD_ID = 'USER_ADD_ID';
export const USER_LEAVE_CHAT = 'USER_LEAVE_CHAT';
export const USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS';
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_DISCONNECTED = 'USER_DISCONNECTED';
export const USER_INVALID_NAME = 'USER_INVALID_NAME';


export interface OnChangeNameInput {
  type: typeof UPDATE_NAME_INPUT,
  payload: string
}

export interface GiveUserId {
  type: typeof USER_ADD_ID,
  payload: string
}

export interface UserLeaveChat {
  type: typeof USER_LEAVE_CHAT,
  payload: string
}

export interface UserDisconnected {
  type: typeof USER_DISCONNECTED,
  payload: string
}

export interface RegisterNameTaken {
  type: typeof USER_ALREADY_EXISTS,
  payload: string
}

export interface RegisterNameSuccess {
  type: typeof USER_REGISTERED,
  payload: string
}

export interface RegisterNameFailed {
  type: typeof USER_DISCONNECTED,
  payload: string
}

export interface InvalidName {
  type: typeof USER_INVALID_NAME,
  payload: string
}

export type UserActionsType = OnChangeNameInput | GiveUserId | UserLeaveChat | UserDisconnected | RegisterNameTaken | RegisterNameSuccess | RegisterNameFailed | InvalidName;

export type RegisterNameTypes = RegisterNameTaken | RegisterNameSuccess | RegisterNameFailed;
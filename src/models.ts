export interface Message {
  name: string,
  message: string,
  role: string,
}

export interface Users {
  name: string,
  id?: string
}

export interface User {
  name: string,
  id: string,
  infoBox: string,
  infoBoxClass: string,
  enteredChat: boolean
}

export interface ChatState {
  currentMessage:string,
  allMessages: Message[],
  allUsers: Users[]
}

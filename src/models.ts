export interface Message {
  user: string,
  message: string,
  role: string,
}

export interface User {
  name: string,
  id?: string
}

export interface ChatState {
  currentMessage:string,
  allMessages: Message[],
  allUsers: User[]
}
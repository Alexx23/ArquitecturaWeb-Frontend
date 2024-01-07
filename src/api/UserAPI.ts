import { getMethod } from ".";

export interface User {
  name: string;
  username: string;
  email: string;
  role: Role;
  cardList: Card[];
}

export interface Role {
  id: number;
  name: string;
  userList: User[];
}

export interface Card {
  id: number;
  expiration: Date;
  user: User[];
}

export default class UserAPI {
  public static async getSelf(): Promise<User> {
    return getMethod<User>("/user");
  }
}

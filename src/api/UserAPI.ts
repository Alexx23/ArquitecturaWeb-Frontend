import { getMethod, Paginated, postMethod, putMethod } from ".";
import { Card } from "./CardAPI";
import { Ticket } from "./TicketAPI";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: Role;
  card_list: Card[];
  ticket_list: Ticket[];
  created_at: Date;
}

export interface Role {
  id: number;
  name: string;
  userList: User[];
}

export interface UserUpdate {
  name?: string;
  username?: string;
  email?: string;
}

export interface ChangePassword {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export default class UserAPI {
  public static async getUsers(
    page: number,
    name?: string | null
  ): Promise<Paginated<User>> {
    let url = "/user?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<User>>(url);
  }

  public static async getUser(id?: number): Promise<User> {
    let url;
    if (id) {
      url = "/user/" + id;
    } else {
      url = "/usersession";
    }
    return getMethod<User>(url);
  }

  public static async changePassword(
    changePassword: ChangePassword
  ): Promise<unknown> {
    return postMethod<unknown>("/usersession/password", changePassword);
  }

  public static async updateUser(user: UserUpdate): Promise<User> {
    return putMethod<User>("/usersession/", user);
  }
}

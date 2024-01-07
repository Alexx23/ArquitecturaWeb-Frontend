import { getMethod, Paginated } from ".";
import { Ticket } from "./TicketAPI";

export interface User {
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

export interface Card {
  id: number;
  expiration: Date;
  user: User[];
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

  public static async getUser(id: number): Promise<Paginated<User>> {
    return getMethod<Paginated<User>>("/user/" + id);
  }
}

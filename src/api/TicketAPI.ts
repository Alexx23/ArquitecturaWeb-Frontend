import { getMethod, Paginated } from ".";
import { Session } from "./SessionAPI";
import { User } from "./UserAPI";

export interface Ticket {
  id: number;
  session: Session;
  user: User;
  depth: number;
  seat: number;
  code: string;
  created_at: Date;
}

export interface TicketSeat {
  depth: number;
  seat: number;
}

export default class TicketAPI {
  public static async getTickets(
    page: number,
    name?: string | null
  ): Promise<Paginated<Ticket>> {
    let url = "/ticket?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<Ticket>>(url);
  }

  public static async getTicket(id: number): Promise<Ticket> {
    return getMethod<Ticket>("/ticket/" + id);
  }
}

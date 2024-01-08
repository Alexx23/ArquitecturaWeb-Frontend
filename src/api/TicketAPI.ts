import { Paginated, deleteMethod, getMethod, postMethod, putMethod } from ".";
import { AgeClassification } from "./AgeClassificationAPI";
import { Director } from "./DirectorAPI";
import { Distributor } from "./DistributorAPI";
import { Genre } from "./GenreAPI";
import { Nationality } from "./NationalityAPI";
import { Session } from "./SessionAPI";
import { User } from "./UserAPI";

export interface Ticket {
  id: number;
  session: Session;
  user: User;
  row: number;
  col: number;
  created_at: Date;
}

export interface TicketCreate {
  session: Session;
  user: User;
  row: number;
  col: number;
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

  public static async createTicket(ticket: TicketCreate): Promise<Ticket> {
    return postMethod<Ticket>("/ticket", ticket);
  }

  public static async deleteTicket(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/ticket/" + id);
  }
}

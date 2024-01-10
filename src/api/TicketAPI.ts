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
  depth: number;
  seat: number;
  created_at: Date;
}

export interface TicketCreate {
  depth: number;
  seat: number;
}

export default class TicketAPI {
  public static crearObjetoTickets = (
    listaTickets: TicketCreate[]
  ): { [posicion: string]: TicketCreate } => {
    const objetoTickets: { [posicion: string]: TicketCreate } = {};

    // Recorrer la lista de tickets y agregar al objeto por posición
    listaTickets.forEach((ticket, index) => {
      const posicion = `${ticket.depth}-${ticket.seat}`;
      objetoTickets[posicion] = ticket;
    });

    return objetoTickets;
  };

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

  public static async createTickets(
    sessionId: number,
    tickets: TicketCreate[]
  ): Promise<unknown> {
    const object: { [index: number]: string } = {};
    tickets.forEach((ticket, index) => {
      object[index] = `${ticket.depth}:${ticket.seat}`;
    });
    return postMethod<Ticket>("/session/" + sessionId + "/ticket", object);
  }
}

import { Room } from "./RoomAPI";
import { deleteMethod, getMethod, postMethod, putMethod } from ".";
import { Movie } from "./MovieAPI";
import { Ticket } from "./TicketAPI";

export interface Session {
  id: number;
  movie: Movie;
  room: Room;
  datetime: Date;
  ticket_list: Ticket[];
}

export interface SessionCreate {
  movie_id: number;
  room_id: number;
  datetime: string;
}

export interface SessionUpdate {
  movie_id?: number;
  room_id?: number;
  datetime?: string;
}

export default class SessionAPI {
  public static async getSessions(value: Date | number): Promise<Session[]> {
    // Si value es Date filtra por fecha, si value es number filtra por id de pelicula
    if (value instanceof Date) {
      return getMethod<Session[]>("/session?date=" + value.toISOString());
    }
    return getMethod<Session[]>("/session?movie_id=" + value);
  }

  public static async getSession(id: number): Promise<Session> {
    return getMethod<Session>("/session/" + id);
  }

  public static async createSession(session: SessionCreate): Promise<Session> {
    return postMethod<Session>("/session", session);
  }

  public static async updateSession(
    id: number,
    session: SessionUpdate
  ): Promise<Session> {
    return putMethod<Session>("/session/" + id, session);
  }

  public static async deleteSession(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/session/" + id);
  }
}

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
  public static async getSessions(
    date: Date,
    movieId?: number | null
  ): Promise<Session[]> {
    let url = "/session?date=" + date.toISOString();
    if (movieId) {
      url += "&movie_id=" + movieId;
    }
    return getMethod<Session[]>(url);
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

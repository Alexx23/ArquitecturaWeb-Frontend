import { deleteMethod, getMethod, Paginated, postMethod, putMethod } from ".";

export interface Room {
  id: number;
  name: string;
  depth: number;
  seats: number;
}

export interface RoomCreate {
  name: string;
  depth: number;
  seats: number;
}

export interface RoomUpdate {
  name?: string;
  depth?: number;
  seats?: number;
}

export default class RoomAPI {
  public static async getRooms(
    page: number,
    name?: string | null
  ): Promise<Paginated<Room>> {
    let url = "/room?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<Room>>(url);
  }

  public static async getAllRooms(): Promise<Room[]> {
    return getMethod<Room[]>("/room/all");
  }

  public static async getRoom(id: number): Promise<Room> {
    return getMethod<Room>("/room/" + id);
  }

  public static async createRoom(room: RoomCreate): Promise<Room> {
    return postMethod<Room>("/room", room);
  }

  public static async updateRoom(id: number, room: RoomUpdate): Promise<Room> {
    return putMethod<Room>("/room/" + id, room);
  }

  public static async deleteRoom(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/room/" + id);
  }
}

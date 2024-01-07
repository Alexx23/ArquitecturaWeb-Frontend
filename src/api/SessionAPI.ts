import { Movie } from "./MovieAPI";
import { Room } from "./RoomAPI";

export interface Session {
  id: number;
  movie: Movie;
  room: Room;
  datetime: Date;
}

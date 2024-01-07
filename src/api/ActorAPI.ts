import { Paginated, deleteMethod, getMethod, postMethod, putMethod } from ".";
import { Movie } from "./MovieAPI";

export interface Actor {
  id: number;
  name: string;
  movie_list: Movie[];
}

export interface ActorCreate {
  name: string;
}

export interface ActorUpdate {
  name?: string;
}

export default class ActorAPI {
  public static async getActors(
    page: number,
    name?: string | null
  ): Promise<Paginated<Actor>> {
    let url = "/actor?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<Actor>>(url);
  }

  public static async getAllActors(): Promise<Actor[]> {
    return getMethod<Actor[]>("/actor/all");
  }

  public static async getActor(id: number): Promise<Paginated<Actor>> {
    return getMethod<Paginated<Actor>>("/actor/" + id);
  }

  public static async createActor(actor: ActorCreate): Promise<Actor> {
    return postMethod<Actor>("/actor", actor);
  }

  public static async updateActor(
    id: number,
    actor: ActorUpdate
  ): Promise<Actor> {
    return putMethod<Actor>("/actor/" + id, actor);
  }

  public static async deleteActor(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/actor/" + id);
  }
}

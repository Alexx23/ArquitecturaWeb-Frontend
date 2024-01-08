import { Paginated, deleteMethod, getMethod, postMethod, putMethod } from ".";

export interface Director {
  id: number;
  name: string;
}

export interface DirectorCreate {
  name: string;
}

export interface DirectorUpdate {
  name?: string;
}

export default class DirectorAPI {
  public static async getDirectors(
    page: number,
    name?: string | null
  ): Promise<Paginated<Director>> {
    let url = "/director?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<Director>>(url);
  }

  public static async getAllDirectors(): Promise<Director[]> {
    return getMethod<Director[]>("/director/all");
  }

  public static async getDirector(id: number): Promise<Director> {
    return getMethod<Director>("/director/" + id);
  }

  public static async createDirector(
    director: DirectorCreate
  ): Promise<Director> {
    return postMethod<Director>("/director", director);
  }

  public static async updateDirector(
    id: number,
    director: DirectorUpdate
  ): Promise<Director> {
    return putMethod<Director>("/director/" + id, director);
  }

  public static async deleteDirector(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/director/" + id);
  }
}

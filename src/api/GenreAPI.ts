import { Paginated, deleteMethod, getMethod, postMethod, putMethod } from ".";

export interface Genre {
  id: number;
  name: string;
}

export interface GenreCreate {
  name: string;
}

export interface GenreUpdate {
  name?: string;
}

export default class GenreAPI {
  public static async getGenres(
    page: number,
    name?: string | null
  ): Promise<Paginated<Genre>> {
    let url = "/genre?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<Genre>>(url);
  }

  public static async getAllGenres(): Promise<Genre[]> {
    return getMethod<Genre[]>("/genre/all");
  }

  public static async getGenre(id: number): Promise<Paginated<Genre>> {
    return getMethod<Paginated<Genre>>("/genre/" + id);
  }

  public static async createGenre(genre: GenreCreate): Promise<Genre> {
    return postMethod<Genre>("/genre", genre);
  }

  public static async updateGenre(
    id: number,
    genre: GenreUpdate
  ): Promise<Genre> {
    return putMethod<Genre>("/genre/" + id, genre);
  }

  public static async deleteGenre(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/genre/" + id);
  }
}

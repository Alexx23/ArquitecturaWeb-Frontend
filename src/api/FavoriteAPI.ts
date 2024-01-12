import { deleteMethod, getMethod, Paginated, postMethod } from ".";
import { Movie } from "./MovieAPI";
import { User } from "./UserAPI";

export interface Favorite {
  id: number;
  user: User;
  movie: Movie;
  created_at: Date;
}

export interface FavoriteMovie {
  movie_id: number;
}

export default class FavoriteAPI {
  public static async getFavorites(page: number): Promise<Paginated<Favorite>> {
    let url = `/favorite?page=` + page;
    return getMethod<Paginated<Favorite>>(url);
  }

  public static async isFavorite(movieId: number): Promise<boolean> {
    return getMethod<boolean>("/movie/" + movieId + "/favorite");
  }

  public static async createFavorite(movieId: number): Promise<unknown> {
    const favorite: FavoriteMovie = {
      movie_id: movieId,
    };
    return postMethod<Favorite>("/favorite", favorite);
  }

  public static async deleteFavorite(movieId: number): Promise<unknown> {
    return deleteMethod<unknown>("/favorite?movie_id=" + movieId);
  }
}

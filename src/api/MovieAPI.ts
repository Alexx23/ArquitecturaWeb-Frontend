import { Paginated, deleteMethod, getMethod, postMethod, putMethod } from ".";
import { Director } from "./DirectorAPI";
import { Distributor } from "./DistributorAPI";
import { Genre } from "./GenreAPI";
import { Nationality } from "./NationalityAPI";

export interface Movie {
  id: number;
  name: string;
  web: string;
  original_title: string;
  duration: number;
  year: number;
  actor_list: Actor[];
  age_classification: AgeClassification;
  director: Director;
  distributor: Distributor;
  genre: Genre;
  nationality: Nationality;
  comment_list: Comment[];
}

export interface Actor {
  id: number;
  name: string;
}

export interface AgeClassification {
  id: number;
  name: string;
  age: number;
}

export interface MovieCreate {
  name: string;
  web: string;
  original_title: string;
  duration: number;
  year: number;
  age_classification_id: number;
  director_id: number;
  distributor_id: number;
  genre_id: number;
  nationality_id: number;
}

export interface MovieUpdate {
  name?: string;
  web?: string;
  original_title?: string;
  duration?: number;
  year?: number;
  age_classification_id?: number;
  director_id?: number;
  distributor_id?: number;
  genre_id?: number;
  nationality_id?: number;
}

export default class movieAPI {
  public static async getMovies(
    page: number,
    name?: string | null
  ): Promise<Paginated<Movie>> {
    let url = "/movie?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<Movie>>(url);
  }

  public static async getMovie(id: number): Promise<Paginated<Movie>> {
    return getMethod<Paginated<Movie>>("/movie/" + id);
  }

  public static async createMovie(movie: MovieCreate): Promise<Movie> {
    return postMethod<Movie>("/movie", movie);
  }

  public static async updateMovie(
    id: number,
    movie: MovieUpdate
  ): Promise<Movie> {
    return putMethod<Movie>("/movie/" + id, movie);
  }

  public static async deleteMovie(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/movie/" + id);
  }
}

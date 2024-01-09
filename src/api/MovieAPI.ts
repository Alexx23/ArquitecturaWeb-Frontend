import { Paginated, deleteMethod, getMethod, postMethod, putMethod } from ".";
import { Actor } from "./ActorAPI";
import { AgeClassification } from "./AgeClassificationAPI";
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
  synopsis: string;
  age_classification: AgeClassification;
  director: Director;
  distributor: Distributor;
  genre: Genre;
  nationality: Nationality;
}

export interface MovieCreate {
  name: string;
  web: string;
  original_title: string;
  duration: number;
  year: number;
  synopsis: string;
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
  synopsis?: string;
  age_classification_id?: number;
  director_id?: number;
  distributor_id?: number;
  genre_id?: number;
  nationality_id?: number;
}

export default class MovieAPI {
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

  public static async getAvailableMovies(
    page: number
  ): Promise<Paginated<Movie>> {
    let url = "/movie/available?page=" + page;
    return getMethod<Paginated<Movie>>(url);
  }

  public static async getAllMovies(): Promise<Movie[]> {
    return getMethod<Movie[]>("/movie/all");
  }

  public static async getMovie(id: number): Promise<Movie> {
    return getMethod<Movie>("/movie/" + id);
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

  public static async setActors(
    id: number,
    actorListIds: any
  ): Promise<unknown> {
    return postMethod<unknown>("/movie/" + id + "/actor", actorListIds);
  }
}

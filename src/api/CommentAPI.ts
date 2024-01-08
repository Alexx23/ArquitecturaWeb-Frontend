import { deleteMethod, getMethod, Paginated, postMethod } from ".";
import { Movie } from "./MovieAPI";
import { User } from "./UserAPI";

export interface Comment {
  id: number;
  user: User;
  movie: Movie;
  content: string;
  created_at: Date;
}

export interface CommentCreate {
  movie_id: number;
  content: string;
}

export default class CommentAPI {
  public static async getComments(
    movieId: number,
    page: number
  ): Promise<Paginated<Comment>> {
    let url = `/movie/${movieId}/comment?page=` + page;
    return getMethod<Paginated<Comment>>(url);
  }

  public static async createComment(comment: CommentCreate): Promise<Comment> {
    return postMethod<Comment>("/comment", comment);
  }

  public static async deleteComment(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/comment/" + id);
  }
}

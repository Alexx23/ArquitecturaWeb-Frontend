import { getMethod, postMethod } from ".";
import { User } from "./UserAPI";

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export default class AuthAPI {
  public static async login(loginRequest: LoginRequest): Promise<User> {
    return postMethod<User>("/login", loginRequest);
  }

  public static async register(
    registerRequest: RegisterRequest
  ): Promise<unknown> {
    return postMethod<unknown>("/register", registerRequest);
  }

  public static async logout(): Promise<unknown> {
    return getMethod<unknown>("/logout");
  }
}

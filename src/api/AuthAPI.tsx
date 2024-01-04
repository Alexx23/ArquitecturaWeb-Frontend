import { getMethod, postMethod } from ".";
import { User } from "./UserAPI";

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export default class AuthAPI {
  public static async login(loginRequest: LoginRequest): Promise<User> {
    return postMethod<User>("/login", loginRequest);
  }

  public static async register(
    registerRequest: RegisterRequest
  ): Promise<RegisterResponse> {
    return postMethod<RegisterResponse>("/register", registerRequest);
  }

  public static async logout(): Promise<LogoutResponse> {
    return getMethod<LogoutResponse>("/logout");
  }
}

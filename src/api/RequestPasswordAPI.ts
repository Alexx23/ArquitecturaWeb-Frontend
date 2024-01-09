import { postMethod } from ".";

export interface RequestPasswordRequest {
  email: string;
}

export default class RequestPasswordAPI {
  public static async requestPassword(
    requestPassword: RequestPasswordRequest
  ): Promise<unknown> {
    return postMethod<unknown>("/request-password", requestPassword);
  }
}

import { getMethod } from ".";

export interface Price {
  id: number;
  name: string;
  amount: number;
}

export default class PriceAPI {
  public static async getPrices(): Promise<Price[]> {
    return getMethod<Price[]>("/price");
  }
}

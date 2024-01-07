import { getMethod } from ".";

export interface AgeClassification {
  id: number;
  name: string;
  age: number;
}

export default class AgeClassificationAPI {
  public static async getAllAgeClassifications(): Promise<AgeClassification[]> {
    return getMethod<AgeClassification[]>("/ageclassification");
  }
}

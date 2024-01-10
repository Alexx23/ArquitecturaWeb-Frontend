import { deleteMethod, getMethod, Paginated, postMethod, putMethod } from ".";

export interface Nationality {
  id: number;
  name: string;
}

export interface NationalityCreate {
  name: string;
}

export interface NationalityUpdate {
  name?: string;
}

export default class NationalityAPI {
  public static async getNationalities(
    page: number,
    name?: string | null
  ): Promise<Paginated<Nationality>> {
    let url = "/nationality?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<Nationality>>(url);
  }

  public static async getAllNationalities(): Promise<Nationality[]> {
    return getMethod<Nationality[]>("/nationality/all");
  }

  public static async getNationality(id: number): Promise<Nationality> {
    return getMethod<Nationality>("/nationality/" + id);
  }

  public static async createNationality(
    nationality: NationalityCreate
  ): Promise<Nationality> {
    return postMethod<Nationality>("/nationality", nationality);
  }

  public static async updateNationality(
    id: number,
    nationality: NationalityUpdate
  ): Promise<Nationality> {
    return putMethod<Nationality>("/nationality/" + id, nationality);
  }

  public static async deleteNationality(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/nationality/" + id);
  }
}

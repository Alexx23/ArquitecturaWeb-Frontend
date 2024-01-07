import { Paginated, deleteMethod, getMethod, postMethod, putMethod } from ".";

export interface Distributor {
  id: number;
  name: string;
}

export interface DistributorCreate {
  name: string;
}

export interface DistributorUpdate {
  name?: string;
}

export default class DistributorAPI {
  public static async getDistributors(
    page: number,
    name?: string | null
  ): Promise<Paginated<Distributor>> {
    let url = "/distributor?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<Distributor>>(url);
  }

  public static async getAllDistributors(): Promise<Distributor[]> {
    return getMethod<Distributor[]>("/distributor/all");
  }

  public static async getDistributor(
    id: number
  ): Promise<Paginated<Distributor>> {
    return getMethod<Paginated<Distributor>>("/distributor/" + id);
  }

  public static async createDistributor(
    distributor: DistributorCreate
  ): Promise<Distributor> {
    return postMethod<Distributor>("/distributor", distributor);
  }

  public static async updateDistributor(
    id: number,
    distributor: DistributorUpdate
  ): Promise<Distributor> {
    return putMethod<Distributor>("/distributor/" + id, distributor);
  }

  public static async deleteDistributor(id: number): Promise<unknown> {
    return deleteMethod<unknown>("/distributor/" + id);
  }
}

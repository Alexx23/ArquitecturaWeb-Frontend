import { deleteMethod, postMethod } from ".";
import { User } from "./UserAPI";

export interface Card {
  id: number;
  title: string;
  expiration: Date;
  user: User[];
  created_at: Date;
}

export interface CardCreate {
  title: string;
  card_number: number;
  expiration: string;
  cvv: number;
}

export default class CardAPI {
  public static async createCard(card: CardCreate): Promise<Card> {
    return postMethod<Card>("/usersession/card", card);
  }

  public static async deleteCard(cardId: number): Promise<unknown> {
    return deleteMethod<unknown>("/usersession/card/" + cardId);
  }
}

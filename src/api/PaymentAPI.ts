import { Paginated, deleteMethod, getMethod, postMethod, putMethod } from ".";
import { AgeClassification } from "./AgeClassificationAPI";
import { Director } from "./DirectorAPI";
import { Distributor } from "./DistributorAPI";
import { Genre } from "./GenreAPI";
import { Nationality } from "./NationalityAPI";
import { Session } from "./SessionAPI";
import { TicketSeat } from "./TicketAPI";
import { User } from "./UserAPI";

export interface PaymentCreate extends BuyObject {
  card_id: number;
}

export interface BuyObject {
  session_id: number;
  seats: TicketSeat[];
}

export default class TicketAPI {
  public static async createPayment(
    paymentRequest: PaymentCreate
  ): Promise<unknown> {
    /*const object: { [index: number]: string } = {};
    tickets.forEach((ticket, index) => {
      object[index] = `${ticket.depth}:${ticket.seat}`;
    });*/
    return postMethod<unknown>("/payment", paymentRequest);
  }
}

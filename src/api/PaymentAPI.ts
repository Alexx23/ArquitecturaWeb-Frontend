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
    const paymentRequestClone: any = { ...paymentRequest };
    const seatsObject: { [index: number]: string } = {};
    paymentRequest.seats.forEach((seat, index) => {
      seatsObject[index] = `${seat.depth}:${seat.seat}`;
    });
    paymentRequestClone.seats = seatsObject;
    return postMethod<unknown>("/payment", paymentRequestClone);
  }
}

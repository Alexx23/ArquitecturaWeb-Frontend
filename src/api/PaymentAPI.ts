import { getMethod, Paginated, postMethod } from ".";
import { TicketSeat } from "./TicketAPI";
import { User } from "./UserAPI";

export interface Payment {
  reference: string;
  amount: number;
  card_title: string;
  user: User;
  created_at: Date;
}

export interface PaymentCreate extends BuyObject {
  card_id: number;
}

export interface BuyObject {
  session_id: number;
  seats: TicketSeat[];
}

export default class PaymentAPI {
  public static async getPayments(
    page: number,
    name?: string | null
  ): Promise<Paginated<Payment>> {
    let url = "/payment?page=" + page;
    if (name) {
      url += "&name=" + name;
    }
    return getMethod<Paginated<Payment>>(url);
  }

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

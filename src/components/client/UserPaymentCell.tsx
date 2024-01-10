import { Payment } from "../../api/PaymentAPI";
import { formatDate } from "../../utils/DateUtils";

interface Props {
  payment: Payment;
}

export default function UserPaymentCell({ payment }: Props) {
  return (
    <>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {formatDate(new Date(payment.created_at))}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {payment.amount + "€"}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {payment.reference}
      </td>
    </>
  );
}

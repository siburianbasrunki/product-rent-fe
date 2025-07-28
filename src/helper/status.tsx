import { FaMoneyBillWave, FaQrcode } from "react-icons/fa";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
          Pending
        </span>
      );
    case "PAID":
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
          Paid
        </span>
      );
    case "CANCELLED":
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
          Cancelled
        </span>
      );
    case "COMPLETED":
      return (
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
          Completed
        </span>
      );
    default:
      return (
        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
          {status}
        </span>
      );
  }
};

export const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case "BANK_TRANSFER":
      return <FaMoneyBillWave className="text-blue-500" />;
    case "QRIS":
      return <FaQrcode className="text-green-500" />;
    default:
      return <FaMoneyBillWave className="text-gray-500" />;
  }
};

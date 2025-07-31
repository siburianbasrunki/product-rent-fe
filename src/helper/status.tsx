import { FaMoneyBillWave, FaQrcode } from "react-icons/fa";

export const getStatusBadge = (status: string) => {
  const baseClasses = "text-xs font-medium py-1 px-3 rounded-full";

  switch (status) {
    case "ACTIVATED":
      return (
        <span
          className={`${baseClasses} bg-[#E9F3F4] text-[#2A8E9E] border border-[#2A8E9E]`}
        >
          Aktif
        </span>
      );
    case "PENDING":
      return (
        <span
          className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`}
        >
          Pending
        </span>
      );
    case "SUCCEEDED":
      return (
        <span
          className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}
        >
          Sukses
        </span>
      );
    case "FAILED":
      return (
        <span
          className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}
        >
          gagal
        </span>
      );
    case "EXPIRED":
      return (
        <span
          className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`}
        >
          Kadaluarsa
        </span>
      );
    default:
      return (
        <span
          className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`}
        >
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

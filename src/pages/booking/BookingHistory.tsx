import {
  FaCalendarAlt,
  FaClock,
  FaSpinner,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useBookingHistory } from "../../hook/booking";
import { formatDate, formatTimeRange } from "../../helper/date";
import { getStatusBadge } from "../../helper/status";

export const BookingHistory = () => {
  const { data: bookings, isLoading } = useBookingHistory();
  console.log("history", history);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E9F3F4] p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-[#2A8E9E]" />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#E9F3F4] p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-[#033247]">Riwayat Booking Product</h1>

          {bookings?.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm p-6">
              <p className="text-[#033247]/70">Anda belum memiliki booking</p>
              <Link
                to="/camera"
                className="text-[#2A8E9E] hover:text-[#033247] transition-colors duration-300 mt-2 inline-block font-medium"
              >
                Booking kamera sekarang
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings?.map((booking) => (
                <Link
                  to={`/booking/detail/${booking.order_id}`}
                  key={booking.order_id}
                  className="block border border-[#2A8E9E]/30 rounded-lg p-4 bg-white hover:bg-[#E9F3F4] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-medium text-lg text-[#033247]">
                        {booking.name || "-"}
                      </h2>
                      <div className="flex items-center mt-1 text-[#033247]/70">
                        <FaCalendarAlt className="mr-2 text-[#2A8E9E]" />
                        <span>{formatDate(booking.book_date as string)}</span>
                      </div>
                      <div className="flex items-center mt-1 text-[#033247]/70">
                        <FaClock className="mr-2 text-[#2A8E9E]" />
                        <span>
                          {formatTimeRange(
                            booking.book_date as string,
                            Number(booking.expired_date)
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#033247]">
                        Rp{booking.price.toLocaleString("id-ID")}
                      </div>
                      <div className="mt-2">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mb-[90px]"></div>
    </>
  );
};
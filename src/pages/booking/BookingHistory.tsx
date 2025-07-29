import { FaCalendarAlt, FaSpinner, FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useBookingHistory } from "../../hook/booking";
import { formatDate } from "../../helper/date";
import { getStatusBadge } from "../../helper/status";

export const BookingHistory = () => {
  const { data: bookings, isLoading } = useBookingHistory();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E9F3F4] p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-[#2A8E9E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9F3F4] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#033247]">
              Riwayat Booking
            </h1>
            <p className="text-[#1D1E20]/60">list sewaan Anda</p>
          </div>
        </div>

        {bookings?.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm p-6">
            <div className="p-4 bg-[#E9F3F4] rounded-full inline-block mb-4">
              <FaCamera className="text-2xl text-[#2A8E9E]" />
            </div>
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
                className="block border border-[#2A8E9E]/20 rounded-xl p-5 bg-white hover:bg-[#F5FAFB] transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#E9F3F4] rounded-lg flex items-center justify-center">
                    {booking.img ? (
                      <img
                        src={booking.img}
                        alt={booking.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <FaCamera className="text-xl text-[#2A8E9E]" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-semibold text-lg text-[#033247] group-hover:text-[#2A8E9E] transition-colors">
                          {booking.name}
                        </h2>
                        <div className="flex items-center mt-2 text-[#1D1E20]/70 text-sm">
                          <FaCalendarAlt className="mr-2 text-[#2A8E9E]" />
                          <span>{formatDate(booking.book_date)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#033247]">
                          Rp{Number(booking.price).toLocaleString("id-ID")}
                        </div>
                        <div className="mt-2">
                          {getStatusBadge(booking.status)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-[#1D1E20]/60">
                      Metode: {booking.method.replace("BOOK-", "")}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mb-[90px]"></div>
    </div>
  );
};

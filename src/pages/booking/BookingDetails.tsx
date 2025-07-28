import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaSpinner,
  FaArrowLeft,
  FaRegCopy,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  useBookingById,
  useCancelBooking,
  useCheckPaymentStatus,
} from "../../hook/booking";
import { useConfirmation } from "../../components/PopUp";

export const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: booking, isLoading } = useBookingById(id || "");
  const { mutate: checkPayment, isPending: isCheckingPayment } =
    useCheckPaymentStatus();
  const [copied, setCopied] = useState(false);
  const { mutate: cancelBooking, isPending: isCancelling } = useCancelBooking();
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const { showConfirmation } = useConfirmation();

  useEffect(() => {
    if (booking?.status === "PENDING" && !paymentStatus) {
      const interval = setInterval(() => {
        checkPayment(booking.id, {
          onSuccess: (data) => {
            setPaymentStatus(data.status);
            if (data.status === "succeeded") {
              clearInterval(interval);
            }
          },
        });
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [booking, checkPayment, paymentStatus]);

  const handleCheckPayment = () => {
    if (!booking) return;
    checkPayment(booking.id, {
      onSuccess: (data) => {
        setPaymentStatus(data.status);
      },
    });
  };

  const handleCancelBooking = () => {
    if (!booking) return;

    showConfirmation("Apakah Anda yakin ingin membatalkan booking ini?", () => {
      cancelBooking(booking.id, {
        onSuccess: () => {
          navigate("/booking");
        },
      });
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E9F3F4] p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-[#2A8E9E]" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#E9F3F4] p-4 flex justify-center items-center">
        <p className="text-[#033247]">Booking tidak ditemukan</p>
      </div>
    );
  }

  const currentStatus = paymentStatus || booking.status;

  return (
    <div className="min-h-screen bg-[#E9F3F4] p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/booking")}
          className="flex items-center text-[#2A8E9E] hover:text-[#033247] transition-colors duration-300 mb-4 cursor-pointer"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </button>

        <h1 className="text-2xl font-bold mb-6 text-[#033247]">
          Detail Booking
        </h1>

        <div className="border border-[#2A8E9E]/30 rounded-lg p-6 bg-white shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-medium text-xl text-[#033247]">
                {booking.product_detail.name}
              </h2>
              <div className="flex items-center mt-2 text-[#033247]/70">
                <FaCalendarAlt className="mr-2 text-[#2A8E9E]" />
                <span>
                  {new Date(booking.created_at).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center mt-1 text-[#033247]/70">
                <FaClock className="mr-2 text-[#2A8E9E]" />
                <span>
                  {new Date(booking.created_at).toLocaleTimeString("id-ID", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="mt-2">
                {currentStatus === "PENDING" && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm outline outline-yellow-800">
                    Menunggu Pembayaran
                  </span>
                )}
                {currentStatus === "SUCCEEDED" && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm outline outline-green-800">
                    Pembayaran Berhasil
                  </span>
                )}
                {currentStatus === "EXPIRED" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm outline outline-red-800">
                    Kadaluarsa
                  </span>
                )}
                {currentStatus === "FAILED" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm outline outline-red-800">
                    Gagal
                  </span>
                )}
                {currentStatus === "ACTIVATED" && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm outline outline-blue-800">
                    Aktif
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2 text-[#033247]">
              Deskripsi Produk
            </h3>
            <ul className="text-[#033247]/80 list-disc pl-5">
              {booking.product_detail.description.map(
                (desc: string, index: number) => (
                  <li key={index}>{desc}</li>
                )
              )}
            </ul>
          </div>

          <div className="border-t border-[#2A8E9E]/30 pt-6">
            <h3 className="font-medium mb-4 text-[#033247]">
              Detail Pembayaran
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {currentStatus === "PENDING" && (
                <div>
                  <div className="flex items-center mb-2 text-[#033247]">
                    <FaMoneyBillWave className="text-[#2A8E9E] mr-2" />
                    <span>Bank Transfer BCA (Bank Central Asia)</span>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2 text-[#033247]">
                      Nomor Virtual Account
                    </h4>
                    <div className="bg-[#E9F3F4] p-3 rounded-lg font-mono text-lg flex items-center gap-3">
                      {booking.virtual_account_id}

                      <FaRegCopy
                        className={`text-[#2A8E9E] cursor-pointer ${
                          copied ? "text-green-500" : ""
                        }`}
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(
                              booking.virtual_account_id
                            );
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          } catch (err) {
                            console.error("Failed to copy:", err);
                          }
                        }}
                      />
                    </div>
                    {copied && (
                      <p className="text-sm text-green-500 mt-2">
                        Nomor virtual account berhasil disalin
                      </p>
                    )}
                    <p className="text-sm text-[#033247]/70 mt-2">
                      Gunakan nomor ini untuk melakukan pembayaran melalui
                      ATM/mobile banking
                    </p>
                  </div>
                </div>
              )}

              <div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#033247]/70">Total Pembayaran</span>
                    <span className="font-medium text-[#033247]">
                      Rp{booking.product_detail.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#033247]/70">Metode Pembayaran</span>
                    <span className="text-[#033247]">Bank Transfer BCA</span>
                  </div>

                  {booking.expired_at && (
                    <div className="flex justify-between">
                      <span className="text-[#033247]/70">
                        Batas Waktu Pembayaran
                      </span>
                      <span className="text-[#033247]">
                        {new Date(booking.expired_at).toLocaleString("id-ID")}
                      </span>
                    </div>
                  )}
                </div>

                {currentStatus === "PENDING" && (
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={handleCheckPayment}
                      disabled={isCheckingPayment}
                      className="w-full bg-gradient-to-r from-[#033247] to-[#2A8E9E] text-white py-2 rounded-lg hover:from-[#033247]/90 hover:to-[#2A8E9E]/90 transition-all duration-300 font-medium disabled:opacity-70 flex items-center justify-center"
                    >
                      {isCheckingPayment ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Memeriksa...
                        </>
                      ) : (
                        "Periksa Status Pembayaran"
                      )}
                    </button>
                    <button
                      onClick={handleCancelBooking}
                      disabled={isCancelling}
                      className="w-full bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition font-medium disabled:bg-red-50 flex items-center justify-center"
                    >
                      {isCancelling ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Membatalkan...
                        </>
                      ) : (
                        "Batalkan Booking"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

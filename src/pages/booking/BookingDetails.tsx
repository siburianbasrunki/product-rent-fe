import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaArrowLeft, FaRegCopy } from "react-icons/fa";
import { useState } from "react";
import { useBookingById } from "../../hook/booking";
import { AuthMessage } from "../../components/AuthMessage";
import { Skeleton } from "../../components/Skeleton";

export const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useBookingById(id || "");

  const [copied, setCopied] = useState(false);
  const [paymentStatus] = useState<any>(null);

  if (isLoading && !booking) {
    return (
      <AuthMessage
        message="Silakan login untuk melihat detail booking"
        actionText="Login"
      >
        <div className="min-h-screen bg-white p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center text-[#2A8E9E] mb-4">
              <Skeleton width={90} height={18} className="rounded-full" />
            </div>

            <Skeleton width={180} height={28} />
            <div className="border border-[#2A8E9E]/30 rounded-lg p-6 bg-white shadow-sm mt-4 space-y-6">
              {/* Header: nama produk + tanggal + status */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton width="70%" height={22} />
                  <div className="flex items-center gap-2">
                    <Skeleton width={16} height={16} rounded="rounded-full" />
                    <Skeleton width={180} height={14} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton width={16} height={16} rounded="rounded-full" />
                    <Skeleton width={120} height={14} />
                  </div>
                </div>
                <Skeleton width={160} height={28} rounded="rounded-full" />
              </div>

              {/* Deskripsi */}
              <div>
                <Skeleton width={160} height={18} className="mb-2" />
                <div className="pl-5 space-y-2">
                  <Skeleton width="90%" height={12} />
                  <Skeleton width="80%" height={12} />
                  <Skeleton width="60%" height={12} />
                </div>
              </div>

              {/* VA + Ringkasan Pembayaran */}
              <div className="border-t border-[#2A8E9E]/30 pt-6 space-y-4">
                <Skeleton width={180} height={18} />
                <div className="bg-[#E9F3F4] p-3 rounded-lg flex items-center gap-3">
                  <Skeleton width="60%" height={20} />
                  <Skeleton width={20} height={20} rounded="rounded" />
                </div>
                <Skeleton width="50%" height={12} />

                <div className="grid grid-cols-1 gap-3 mt-4">
                  <div className="flex justify-between">
                    <Skeleton width={160} height={14} />
                    <Skeleton width={120} height={16} />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton width={160} height={14} />
                    <Skeleton width={140} height={16} />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton width={200} height={14} />
                    <Skeleton width={160} height={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-[50px]" />
        </div>
      </AuthMessage>
    );
  }

  if (isError) {
    return (
      <AuthMessage
        message="Silakan login untuk melihat detail booking"
        actionText="Login"
      >
        <div className="min-h-screen bg-white p-4">
          <div className="max-w-2xl mx-auto">
            <p className="text-red-600">{error.message}</p>
          </div>
        </div>
      </AuthMessage>
    );
  }

  if (!booking) {
    return (
      <AuthMessage
        message="Silakan login untuk melihat detail booking"
        actionText="Login"
      >
        <div className="min-h-screen bg-white p-4" />
      </AuthMessage>
    );
  }

  const currentStatus = paymentStatus || booking.status;

  return (
    <AuthMessage
      message="Silakan login untuk melihat detail booking"
      actionText="Login"
    >
      <div className="min-h-screen bg-white p-4">
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
                {(currentStatus === "PENDING" ||
                  currentStatus === "ACTIVATED") && (
                  <div>
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

                <div className="mb-[50px]">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[#033247]/70">
                        Total Pembayaran
                      </span>
                      <span className="font-medium text-[#033247]">
                        Rp{booking.product_detail.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#033247]/70">
                        Metode Pembayaran
                      </span>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthMessage>
  );
};

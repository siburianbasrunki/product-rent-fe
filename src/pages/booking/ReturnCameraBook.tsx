import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCamera, FaCheckCircle, FaUpload, FaArrowLeft } from "react-icons/fa";
import { useBookingById, useProcessReturn } from "../../hook/booking";

export const ReturnCamera = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: booking, isLoading } = useBookingById(id || "");
  const [returnFile, setReturnFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const { mutate: processReturn, isPending: isSubmitting } = useProcessReturn();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReturnFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!returnFile) {
      alert("Please upload return proof");
      return;
    }

    const formData = new FormData();
    formData.append("returnProof", returnFile);
    formData.append("rating", rating?.toString() || "");
    formData.append("comment", comment);

    if (id) {
      processReturn({ bookingId: id, formData });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <p>Booking tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </button>

        <h1 className="text-2xl font-bold mb-6">Pengembalian Kamera</h1>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex items-center mb-4">
            <FaCamera className="text-indigo-500 mr-3 text-xl" />
            <h2 className="text-lg font-semibold">{booking.product_detail.name}</h2>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal Mulai</span>
              <span className="font-medium">
                {new Date(booking.created_at).toLocaleDateString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal Selesai</span>
              <span className="font-medium">
                {new Date(booking.expired_at).toLocaleDateString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Durasi</span>
              <span className="font-medium">{booking.created_at} hari</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Bukti Pengembalian
            </label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              {previewUrl ? (
                <div className="mb-2">
                  <img
                    src={previewUrl}
                    alt="Return proof preview"
                    className="max-h-40 mx-auto mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setReturnFile(null);
                      setPreviewUrl(null);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <FaUpload className="text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Klik untuk mengunggah bukti pengembalian
                    </p>
                    <p className="text-xs text-gray-400">
                      (Foto kondisi kamera saat dikembalikan)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Review Kamera</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      rating && star <= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Komentar (opsional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={200}
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="Bagaimana pengalaman Anda menggunakan kamera ini?"
              />
              <p className="text-xs text-gray-500 text-right">
                {comment.length}/200
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium disabled:bg-indigo-300 flex items-center justify-center mb-[80px]"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">↻</span>
                Memproses...
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-2" />
                Konfirmasi Pengembalian
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

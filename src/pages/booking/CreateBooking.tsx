import { useState } from "react";
import {
  FaCalendarAlt,
  FaArrowLeft,
  FaMoneyBillWave,
  FaIdCard,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCreateBooking, useUploadImage } from "../../hook/booking";
import { useInfoProductByid, useProductByid } from "../../hook/product";

export const CreateBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: createBooking, isPending } = useCreateBooking();
  const { mutateAsync: uploadImage } = useUploadImage();
  const { data: productDetail, isLoading } = useProductByid();
  const { data: infoBook } = useInfoProductByid();

  const [bookingData, setBookingData] = useState({
    product_id: id,
    start_date: "",
    end_date: "",
    desc: "",
    type: 1,
  });
  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadField, setShowUploadField] = useState(!infoBook?.is_upload);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIdentityFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (showUploadField && !identityFile) {
      alert("Please upload your identity proof");
      return;
    }

    try {
      setIsUploading(true);
      let imageUrl = "";

      if (identityFile || showUploadField) {
        const uploadResponse = await uploadImage(identityFile!);
        imageUrl = uploadResponse.url;
      }

      const payload = {
        product_id: id || bookingData.product_id || "",
        start_date: bookingData.start_date,
        end_date: bookingData.end_date,
        desc: bookingData.desc,
        type: bookingData.type,
        ...(imageUrl && { file: imageUrl }), 
      };

      createBooking(payload, {
        onSuccess: () => {
          navigate("/booking");
        },
        onError: (error) => {
          console.error("Booking error:", error);
          alert("Failed to create booking");
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReuploadClick = () => {
    setShowUploadField(true);
    setIdentityFile(null);
    setPreviewUrl(null);
  };
   const handleCancelReupload = () => {
    setShowUploadField(false);
    setIdentityFile(null);
    setPreviewUrl(null);
  };


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
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Link
              to="/product"
              className="mr-4 text-[#2A8E9E] hover:text-[#033247] transition-colors duration-300"
            >
              <FaArrowLeft className="text-lg" />
            </Link>
            <h1 className="text-2xl font-bold text-[#033247]">
              Buat Booking Baru
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#033247]">
                Tipe Kamera
              </label>
              <input
                type="text"
                name="cameraType"
                value={productDetail?.name || ""}
                readOnly
                className="w-full p-3 border border-[#2A8E9E]/30 rounded-lg bg-white text-[#033247] cursor-not-allowed focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#033247]">
                  Tanggal Mulai
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="start_date"
                    value={bookingData.start_date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#2A8E9E]/30 rounded-lg pl-10 bg-white text-[#033247] focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <FaCalendarAlt className="absolute left-3 top-3.5 text-[#2A8E9E]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#033247]">
                  Tanggal Selesai
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="end_date"
                    value={bookingData.end_date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#2A8E9E]/30 rounded-lg pl-10 bg-white text-[#033247] focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
                    required
                    min={
                      bookingData.start_date ||
                      new Date().toISOString().split("T")[0]
                    }
                  />
                  <FaCalendarAlt className="absolute left-3 top-3.5 text-[#2A8E9E]" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#033247]">
                Tujuan Pemakaian
              </label>
              <textarea
                name="desc"
                value={bookingData.desc}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#2A8E9E]/30 rounded-lg bg-white text-[#033247] focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
                rows={4}
                required
                placeholder="Contoh: Pemotretan produk, Wedding, dll."
              />
            </div>

             {showUploadField ? (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-[#033247]">
                    Upload Identitas (KTP/SIM)
                  </label>
                  {infoBook?.is_upload && (
                    <button
                      type="button"
                      onClick={handleCancelReupload}
                      className="text-sm text-[#E74C3C] hover:text-[#C0392B] flex items-center transition-colors duration-300"
                    >
                      <FaTimes className="mr-1" /> Batalkan
                    </button>
                  )}
                </div>
                <div className="border-2 border-dashed border-[#2A8E9E] rounded-lg p-4 text-center bg-white/50 hover:bg-white/70 transition-colors duration-300">
                  {previewUrl ? (
                    <div className="mb-2">
                      <img
                        src={previewUrl}
                        alt="Identity preview"
                        className="max-h-40 mx-auto mb-2 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIdentityFile(null);
                          setPreviewUrl(null);
                        }}
                        className="text-[#E74C3C] text-sm hover:text-[#C0392B] transition-colors duration-300"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <FaIdCard className="text-3xl text-[#2A8E9E] mb-2" />
                        <p className="text-sm text-[#033247]/80">
                          Klik untuk mengunggah foto KTP/SIM
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </label>
                  )}
                </div>
              </div>
            ) : infoBook?.is_upload ? (
              <div className="p-4 border border-[#2A8E9E]/30 rounded-lg bg-white">
                <p className="text-[#033247] mb-3">
                  Anda sudah mengunggah identitas.
                </p>
                <button
                  type="button"
                  onClick={handleReuploadClick}
                  className="text-sm text-[#2A8E9E] hover:text-[#033247] underline transition-colors duration-300"
                >
                  Upload ulang identitas?
                </button>
              </div>
            ) : null}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#033247]">
                Metode Pembayaran
              </label>
              <div className="space-y-2">
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-[#2A8E9E]/30 rounded-lg cursor-pointer bg-white hover:bg-[#E9F3F4] transition-colors duration-300">
                    <input
                      type="radio"
                      name="type"
                      value={1}
                      checked={bookingData.type === 1}
                      onChange={handleInputChange}
                      className="mr-2 text-[#2A8E9E] focus:ring-[#2A8E9E]"
                    />
                    <FaMoneyBillWave className="mr-2 text-[#2A8E9E]" />
                    <span className="text-[#033247]">
                      Bank Transfer (Virtual Account)
                    </span>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-[#2A8E9E]/30 rounded-lg cursor-pointer bg-white hover:bg-[#E9F3F4] transition-colors duration-300">
                    <input
                      type="radio"
                      name="type"
                      value={2}
                      checked={bookingData.type === 2}
                      onChange={handleInputChange}
                      className="mr-2 text-[#2A8E9E] focus:ring-[#2A8E9E]"
                    />
                    <FaMoneyBillWave className="mr-2 text-[#2A8E9E]" />
                    <span className="text-[#033247]">
                      Saldo Rent-App (Rp 300.000)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending || isUploading}
              className="w-full bg-gradient-to-r from-[#033247] to-[#2A8E9E] text-white py-3 rounded-lg hover:from-[#033247]/90 hover:to-[#2A8E9E]/90 transition-all duration-300 font-medium disabled:opacity-70 shadow-md hover:shadow-lg"
            >
              {isPending || isUploading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Memproses...
                </span>
              ) : (
                "Buat Booking"
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="mb-[90px]"></div>
    </>
  );
};

import { useState } from "react";
import {
  FaCalendarAlt,
  FaArrowLeft,
  FaIdCard,
  FaSpinner,
  FaTimes,
  FaWallet,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCreateBooking, useUploadImage } from "../../hook/booking";
import { useInfoProductByid, useProductByid } from "../../hook/product";
import { useCredit } from "../../hook/credit";
import { formatRupiah } from "../../helper/formatRupiah";
import BRILogo from "../../assets/bri-logo.png";
import BCALogo from "../../assets/bca-logo.png";
import MandiriLogo from "../../assets/mandiri-log.png";
import PlaneLottieOverlay from "../../components/PlaneLottieOverlay";
const BANK_OPTIONS = [
  { type: 1 as const, name: "Mandiri", logo: MandiriLogo },
  { type: 2 as const, name: "BCA", logo: BCALogo },
  { type: 3 as const, name: "BRI", logo: BRILogo },
];
export const CreateBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPlane, setShowPlane] = useState(false);
  const { mutate: createBooking, isPending } = useCreateBooking();
  const { mutateAsync: uploadImage } = useUploadImage();
  const { data: productDetail, isLoading } = useProductByid();
  const { data: infoBook } = useInfoProductByid();
  const { data: credit } = useCredit();
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
          setShowPlane(true);
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
      <div className="min-h-screen bg-white p-4">
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
              <label className="block text-sm font-medium mb-1 text-[#1D1E20]">
                Tipe Kamera
              </label>
              <input
                type="text"
                name="cameraType"
                value={productDetail?.name || ""}
                readOnly
                className="w-full p-3 border border-[#E9F3F4] rounded-lg bg-white text-[#1D1E20] cursor-not-allowed focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#1D1E20]">
                  Tanggal Mulai
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="start_date"
                    value={bookingData.start_date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#E9F3F4] rounded-lg pl-10 bg-white text-[#1D1E20] focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <FaCalendarAlt className="absolute left-3 top-3.5 text-[#2A8E9E]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[#1D1E20]">
                  Tanggal Selesai
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="end_date"
                    value={bookingData.end_date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#E9F3F4] rounded-lg pl-10 bg-white text-[#1D1E20] focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
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
              <label className="block text-sm font-medium mb-1 text-[#1D1E20]">
                Tujuan Pemakaian
              </label>
              <textarea
                name="desc"
                value={bookingData.desc}
                onChange={handleInputChange}
                className="w-full p-3 border border-[#E9F3F4] rounded-lg bg-white text-[#1D1E20] focus:ring-2 focus:ring-[#2A8E9E] focus:border-transparent"
                rows={4}
                required
                placeholder="Contoh: Pemotretan produk, Wedding, dll."
              />
            </div>

            {showUploadField ? (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-[#1D1E20]">
                    Upload Identitas (KTP/SIM)
                  </label>
                  {infoBook?.is_upload && (
                    <button
                      type="button"
                      onClick={handleCancelReupload}
                      className="text-sm text-red-500 hover:text-red-700 flex items-center transition-colors duration-300"
                    >
                      <FaTimes className="mr-1" /> Batalkan
                    </button>
                  )}
                </div>
                <div className="border-2 border-dashed border-[#2A8E9E] rounded-lg p-4 text-center bg-[#E9F3F4] hover:bg-[#E9F3F4]/70 transition-colors duration-300">
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
                        className="text-red-500 text-sm hover:text-red-700 transition-colors duration-300"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <FaIdCard className="text-3xl text-[#2A8E9E] mb-2" />
                        <p className="text-sm text-[#1D1E20]/80">
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
              <div className="p-4 border border-[#E9F3F4] rounded-lg bg-[#E9F3F4]">
                <p className="text-[#1D1E20] mb-3">
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
              <label className="block text-sm font-medium mb-1 text-[#1D1E20]">
                Metode Pembayaran
              </label>

              <div className="mb-2 text-sm font-medium text-[#033247]">
                Bank Transfer (Virtual Account)
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {BANK_OPTIONS.map((b) => (
                  <label
                    key={b.type}
                    className={`relative flex flex-col items-center justify-center gap-2 p-3 border rounded-lg bg-white cursor-pointer transition-all duration-300
          ${
            bookingData.type === b.type
              ? "border-[#2A8E9E] ring-2 ring-[#2A8E9E]/30"
              : "border-[#E9F3F4] hover:bg-[#E9F3F4]"
          }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={b.type}
                      checked={bookingData.type === b.type}
                      onChange={() =>
                        setBookingData((prev) => ({ ...prev, type: b.type }))
                      }
                      className="absolute top-2 left-2 accent-[#2A8E9E]"
                    />
                    <img
                      src={b.logo}
                      alt={`${b.name} logo`}
                      className="h-8 object-contain"
                    />
                    <span className="text-xs text-[#1D1E20]">{b.name}</span>
                  </label>
                ))}
              </div>

              <label
                className={`flex items-center p-3 border rounded-lg cursor-pointer bg-white transition-colors duration-300
      ${
        bookingData.type === 4
          ? "border-[#2A8E9E] ring-2 ring-[#2A8E9E]/30"
          : "border-[#E9F3F4] hover:bg-[#E9F3F4]"
      }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={4}
                  checked={bookingData.type === 4}
                  onChange={() =>
                    setBookingData((prev) => ({ ...prev, type: 4 }))
                  }
                  className="mr-2 accent-[#2A8E9E]"
                />
                <FaWallet className="mr-2 text-[#2A8E9E]" />
                <span className="text-[#1D1E20]">
                  Saldo Rent-App ({formatRupiah(credit?.balance || 0)})
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isPending || isUploading}
              className="w-full bg-[#2A8E9E] text-white py-3 rounded-lg hover:bg-[#033247] transition-all duration-300 font-medium disabled:opacity-70 shadow-md hover:shadow-lg"
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
      <PlaneLottieOverlay
        show={showPlane}
        loop={false}
        durationMs={1200}
        onDone={() => {
          setShowPlane(false);
          navigate("/booking");
        }}
      />
    </>
  );
};

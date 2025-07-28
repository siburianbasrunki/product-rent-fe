import React from "react";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../helper/formatRupiah";
import { EmptyState } from "../../components/EmptyState";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useProductByid } from "../../hook/product";
// import { useCreateBooking } from "../../hook/booking";

interface ImageItem {
  id: string;
  imageUrl: string;
  isMain: boolean;
}

const ProductDetail = () => {
  const { data: products, isLoading, isError, error } = useProductByid();
  // const { mutate: createBooking, isPending } = useCreateBooking();

  const navigate = useNavigate();

  const allImages: ImageItem[] = React.useMemo(() => {
    if (!products || !products.img || !Array.isArray(products.img)) {
      return [];
    }

    return products.img.map((imageUrl: string, index: number) => ({
      id: `image-${index}`,
      imageUrl: imageUrl,
      isMain: index === 0,
    }));
  }, [products]);

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    dotsClass: "slick-dots !bottom-2", // Custom dots position
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-[#2A8E9E]" />
      </div>
    );
  }

  if (isError) return <EmptyState title={error.message} />;

  if (!products) {
    return <EmptyState title="Product not found" />;
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   createBooking({
  //     product_id: products?.id || "",
  //     type: 2,
  //   });
  // };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      <button
        onClick={() => navigate("/product")}
        className="flex items-center text-[#033247] mb-4 cursor-pointer p-4 hover:text-[#2A8E9E] transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Kembali
      </button>

      {allImages.length > 0 && (
        <div className="mb-4 overflow-hidden">
          <Slider {...settings}>
            {allImages.map((image: ImageItem) => (
              <div key={image.id} className="relative">
                <img
                  src={image.imageUrl}
                  alt={products?.name || "Product image"}
                  className="w-full h-64 object-cover"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-image.jpg";
                  }}
                />
                {image.isMain && (
                  <span className="absolute top-2 left-2 bg-[#2A8E9E] text-white text-xs px-2 py-1 rounded">
                    Main Image
                  </span>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}

      <div className="px-4">
        <h1 className="text-2xl font-bold text-[#033247]">{products?.name}</h1>
        <p className="text-[#2A8E9E] mt-2 font-medium">
          {formatRupiah(products?.price || 0)} / day
        </p>

        <h2 className="mt-6 text-xl font-semibold text-[#033247]">
          Ciri-ciri:
        </h2>
        <ul className="mt-2 list-disc list-inside text-[#1D1E20]/80 space-y-1">
          {products?.description && Array.isArray(products.description) ? (
            products.description.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li>No description available</li>
          )}
        </ul>

        <div className="mt-4 p-3 rounded-lg bg-[#E9F3F4] border border-[#2A8E9E]/20">
          <p className="text-sm text-[#033247]">
            <span className="font-semibold">Status: </span>
            <span
              className={`${
                products?.available ? "text-green-600" : "text-red-600"
              }`}
            >
              {products?.available ? "Tersedia" : "Tidak Tersedia"}
            </span>
          </p>
          <p className="text-sm mt-1 text-[#033247]">
            <span className="font-semibold">Kategori: </span>
            {products?.category_name}
          </p>
        </div>

        <button
          // onClick={handleSubmit}
          onClick={() =>
            navigate(`/booking/${products?.id}`, { state: { products } })
          }
          disabled={!products?.available}
          className={`mt-6 w-full px-4 py-3 rounded-lg text-sm font-medium ${
            products?.available
              ? "bg-[#2A8E9E] text-white hover:bg-[#033247]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } transition-all duration-300 shadow-md`}
        >
          {products?.available ? "Booking Sekarang" : "Tidak Tersedia"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

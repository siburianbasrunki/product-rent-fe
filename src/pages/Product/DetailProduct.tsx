import React from "react";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../helper/formatRupiah";
import { EmptyState } from "../../components/EmptyState";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useProductByid } from "../../hook/product";

interface ImageItem {
  id: string;
  imageUrl: string;
  isMain: boolean;
}

const ProductDetail = () => {
  const { data: products, isLoading, isError, error } = useProductByid();
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
    dotsClass: "slick-dots !bottom-2",
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

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-8">
      <button
        onClick={() => navigate("/product")}
        className="flex items-center text-[#033247] mb-2 cursor-pointer p-4 hover:text-[#2A8E9E] transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        <span className="font-medium">Kembali</span>
      </button>

      {allImages.length > 0 && (
        <div className="mb-6 overflow-hidden px-2">
          <Slider {...settings}>
            {allImages.map((image: ImageItem) => (
              <div key={image.id} className="relative rounded-lg overflow-hidden shadow-sm">
                <img
                  src={image.imageUrl}
                  alt={products?.name || "Product image"}
                  className="w-full h-72 object-cover"
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

      <div className="px-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#033247] mb-1">{products?.name}</h1>
          <p className="text-[#2A8E9E] text-lg font-semibold">
            {formatRupiah(products?.price || 0)} / day
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#033247] mb-3 border-b pb-1">
            Spesifikasi:
          </h2>
          <ul className="space-y-2 text-[#1D1E20]/90">
            {products?.description && Array.isArray(products.description) ? (
              products.description.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2A8E9E] mt-2 mr-2"></span>
                  {item}
                </li>
              ))
            ) : (
              <li>No description available</li>
            )}
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-[#F7FAFA] border border-[#2A8E9E]/30 mb-6">
          <p className="text-sm text-[#033247] mb-2">
            <span className="font-medium">Status: </span>
            <span
              className={`font-medium ${
                products?.available ? "text-green-600" : "text-red-600"
              }`}
            >
              {products?.available ? "Tersedia" : "Tidak Tersedia"}
            </span>
          </p>
          <p className="text-sm text-[#033247]">
            <span className="font-medium">Kategori: </span>
            <span className="capitalize">{products?.category_name}</span>
          </p>
        </div>

        <button
          onClick={() =>
            navigate(`/booking/${products?.id}`, { state: { products } })
          }
          disabled={!products?.available}
          className={`mt-4 w-full px-4 py-3 rounded-lg text-base font-medium ${
            products?.available
              ? "bg-[#2A8E9E] text-white hover:bg-[#033247] shadow-md"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          } transition-all duration-300 mb-[80px]`}
        >
          {products?.available ? "Booking Sekarang" : "Tidak Tersedia"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
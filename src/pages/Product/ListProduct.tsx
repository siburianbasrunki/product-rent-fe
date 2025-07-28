import { useNavigate, useSearchParams } from "react-router-dom";
import { formatRupiah } from "../../helper/formatRupiah";
import { EmptyState } from "../../components/EmptyState";
import { useState } from "react";
import {
  FaSpinner,
  FaSearch,
  FaStar,
  // FaChevronLeft,
  // FaChevronRight,
} from "react-icons/fa";
import { useDebounce } from "../../hook/debunce";
import { useProducts } from "../../hook/product";
import { BiBox } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
//   <button
//     onClick={onClick}
//     className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
//     style={{ zIndex: 2 }}
//   >
//     <FaChevronLeft className="text-[#033247] text-sm" />
//   </button>
// );

// const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
//   <button
//     onClick={onClick}
//     className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
//     style={{ zIndex: 2 }}
//   >
//     <FaChevronRight className="text-[#033247] text-sm" />
//   </button>
// );

const ProductListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProducts(debouncedSearchTerm);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading && !products) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E9F3F4] to-white p-4 flex justify-center items-center">
        <div className="animate-spin">
          <FaSpinner className="text-3xl text-[#2A8E9E]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#E9F3F4] flex-1 flex flex-col pb-20">
      <div className="p-6">
        <div
          className="flex items-center gap-3 mb-8"
          style={{ animation: "fadeIn 0.6s ease-out forwards" }}
        >
          <div className="p-3 bg-[#033247] rounded-xl shadow-lg">
            <BiBox className="text-white text-xl" />
          </div>
          <div>
            <p className="text-[#1D1E20]/60">
              Find your perfect product to rent
            </p>
          </div>
        </div>

        <div
          className="mb-8 relative"
          style={{ animation: "fadeIn 0.6s ease-out forwards" }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FaSearch className="text-[#1D1E20]/40" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-4 pl-12 pr-12 rounded-2xl border-none bg-white shadow-md focus:ring-2 focus:ring-[#2A8E9E] text-[#1D1E20] placeholder-[#1D1E20]/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <div className="animate-spin">
                  <FaSpinner className="text-[#2A8E9E]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {debouncedSearchTerm && (
          <p
            className="text-sm text-[#1D1E20]/70 mb-6 px-2"
            style={{ animation: "fadeIn 0.6s ease-out forwards" }}
          >
            Showing results for:{" "}
            <span className="font-medium text-[#033247]">
              "{debouncedSearchTerm}"
            </span>
          </p>
        )}

        {isError ? (
          <EmptyState title={error.message} />
        ) : products?.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-12"
            style={{ animation: "fadeIn 0.6s ease-out forwards" }}
          >
            <div className="p-6 bg-white rounded-full shadow-lg mb-4">
              <BiBox className="text-4xl text-[#2A8E9E]" />
            </div>
            <h3 className="text-xl font-bold text-[#033247] mb-2">
              {debouncedSearchTerm
                ? "No products found"
                : "No products available"}
            </h3>
            <p className="text-[#1D1E20]/60 text-center max-w-md">
              {debouncedSearchTerm
                ? `We couldn't find any products matching "${debouncedSearchTerm}"`
                : "Check back later for new arrivals"}
            </p>
          </div>
        ) : (
          <div className="relative -mx-2">
            <Slider {...sliderSettings}>
              {products?.map((product, index) => (
                <div key={product.id} className="px-2 ">
                  <div
                    className="bg-gradient-to-r from-[#033247] to-[#2A8E9E] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#033247]"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animation: "fadeIn 0.6s ease-out forwards",
                    }}
                  >
                    <div className="relative">
                      <div className="w-full h-40 flex items-center justify-center bg-[#E9F3F4] relative overflow-hidden">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain p-3"
                        />

                        {!product.available && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                            Rented
                          </div>
                        )}

                        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full backdrop-blur-sm">
                          <FaStar className="text-yellow-400 text-xs" />
                          <span className="text-xs font-medium text-[#033247]">
                            4.8
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-xs text-[#E9F3F4] font-medium"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {product.category}
                          </span>
                        </div>
                        <h3
                          className="text-sm font-semibold text-[#E9F3F4] leading-tight"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {product.name}
                        </h3>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-[#E9F3F4] font-medium">
                            Daily rate
                          </p>
                          <p className="text-base font-bold text-[#E9F3F4]">
                            {formatRupiah(product.price)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                          }}
                          className="px-4 py-1.5 bg-white text-[#033247] rounded-md text-sm font-medium shadow hover:shadow-md transition hover:bg-[#E9F3F4]"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;

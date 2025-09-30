import { FaArrowRight } from "react-icons/fa";
import { formatRupiah } from "../../helper/formatRupiah";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState";
import { FaCamera } from "react-icons/fa";
import { useProducts } from "../../hook/product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SkeletonCard, Skeleton } from "../../components/Skeleton";

export const ProductSection = () => {
  const navigate = useNavigate();
  const {
    data: products,
    isError,
    isLoading,
    isFetching,
    error,
  } = useProducts();

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.8,
    slidesToScroll: 1,
    arrows: false,
  };

  if (isLoading && !products) {
    return (
      <div className="p-4 mb-[50px]">
        <div className="flex justify-between items-center mb-6">
          <Skeleton width={140} height={20} />
          <Skeleton width={90} height={18} rounded="rounded-full" />
        </div>

        <div className="relative -mx-2">
          <div className="flex gap-4 px-2 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="min-w-[260px]">
                <SkeletonCard imgHeight={160} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="p-4 mb-[50px]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-bold text-[#033247]">Semua Product</h2>
        </div>

        {products?.length ? (
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-1 text-[#2A8E9E] hover:text-[#033247] transition-colors duration-300 cursor-pointer"
          >
            <span className="text-sm font-medium">Lihat Semua</span>
            <FaArrowRight className="text-sm" />
          </button>
        ) : null}
      </div>

      {products?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 bg-white rounded-2xl shadow-sm">
          <FaCamera className="text-3xl text-[#2A8E9E] mb-3" />
          <p className="text-[#1D1E20]/70">No cameras available</p>
        </div>
      ) : (
        <div className="relative -mx-2">
          {isFetching && (
            <div className="px-2 mb-3">
              <Skeleton height={8} className="w-24 rounded-full" />
            </div>
          )}

          <Slider {...sliderSettings}>
            {products?.map((product) => (
              <div key={product.id} className="px-2">
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#E9F3F4]"
                >
                  <div className="relative">
                    <div className="w-full h-40 flex items-center justify-center bg-[#E9F3F4] relative">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain p-4"
                      />
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold text-[#033247] line-clamp-2 h-10">
                        {product.name}
                      </h3>
                    </div>

                    <div>
                      <p className="text-xs text-[#2A8E9E]">Daily rate</p>
                      <p className="text-base font-bold text-[#033247]">
                        {formatRupiah(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

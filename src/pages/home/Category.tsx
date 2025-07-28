import { useCategory } from "../../hook/categories";
import { EmptyState } from "../../components/EmptyState";
import { CardSkeleton } from "../../components/Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export const CategorySection = () => {
  const navigate = useNavigate();
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    swipeToSlide: true,
    touchThreshold: 10,
    adaptiveHeight: false,
    cssEase: "ease-out",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const { data: category, isLoading, isError, error } = useCategory();

  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="p-4 ">
      <div className="flex justify-between items-center mb-6 ">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-bold text-[#033247]">Kategori Product</h2>
        </div>
        {category?.length === 0 ? null : (
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-1 text-[#2A8E9E] hover:text-[#033247] transition-colors duration-300 cursor-pointer"
          >
            <span className="text-sm font-medium">Lihat Semua</span>
            <FaArrowRight className="text-sm" />
          </button>
        )}
      </div>

      <div className="slider-container">
        <Slider {...sliderSettings}>
          {category?.map((category) => (
            <div
              key={category.id}
              className="px-2 outline-none focus:outline-none select-none"
            >
              <div className="relative h-40 rounded-md overflow-hidden bg-gray-100 mx-2">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${category.img})`,
                  }}
                />
                <div
                  className="absolute inset-0 bg-[#033247]"
                  style={{
                    opacity: 0.5,
                  }}
                ></div>
                <p className="absolute bottom-2 left-2 text-xs font-medium text-white">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

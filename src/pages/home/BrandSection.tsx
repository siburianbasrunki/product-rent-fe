import { useBrand } from "../../hook/brand";
import { EmptyState } from "../../components/EmptyState";
import { CardSkeleton } from "../../components/Skeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const BrandSection = () => {
  const sliderSettings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-out",
    pauseOnHover: true,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const { data: brands, isLoading, isError, error } = useBrand();

  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="p-4">
      <p className="text-xl font-bold text-[#033247] mb-2">Brand</p>

      <div className="slider-container">
        <Slider {...sliderSettings}>
          {brands?.map((brand) => (
            <div
              key={brand.id}
              className="px-1 outline-none focus:outline-none"
            >
              <div className="flex flex-col items-center ">
                <div className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={brand.imageUrl}
                    alt={brand.name}
                    className="w-20 h-20 object-contain object-center"
                  />
                </div>
                <p className="text-sm text-[#1D1E20] mt-2 text-center font-medium">
                  {brand.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

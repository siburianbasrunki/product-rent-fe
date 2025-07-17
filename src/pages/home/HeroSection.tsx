import { EmptyState } from "../../components/EmptyState";
import { CardSkeleton } from "../../components/Skeleton";
import { useBanner } from "../../hook/banner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState, useEffect } from "react";

const HeroSection = () => {
  const { data, isLoading, isError, error } = useBanner();
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const dummyData = [
    {
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=200&fit=crop",
      title: "Selamat Datang di Website Kami",
      subTitle: "Temukan pengalaman terbaik bersama kami"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=200&fit=crop",
      title: "Jelajahi Fitur Terbaru",
      subTitle: "Inovasi terdepan untuk kebutuhan Anda"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=200&fit=crop",
      title: "Bergabunglah dengan Komunitas",
      subTitle: "Bersama membangun masa depan yang lebih baik"
    }
  ];

  const originalData = Array.isArray(data) ? data : data ? [data] : [];
  const bannerData = originalData.length > 0 ? [...originalData, ...dummyData.slice(0, 2)] : dummyData;

  useEffect(() => {
    if (bannerData.length <= 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          sliderRef.current?.slickNext();
          return 0;
        }
        return prev + 1; 
      });
    }, 50);

    return () => clearInterval(interval);
  }, [bannerData.length, currentSlide]);

  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, 
    arrows: false,
    beforeChange: ( newIndex: number) => {
      setCurrentSlide(newIndex);
      setProgress(0);
    },
  };

  const handleDotClick = (index: number) => {
    sliderRef.current?.slickGoTo(index);
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse items-center">
          <div className="mt-1 relative w-full">
            <div className="relative rounded-b-md overflow-hidden shadow-lg">
              {bannerData.length > 1 ? (
                <Slider ref={sliderRef} {...settings}>
                  {bannerData.map((banner, index) => (
                    <div key={index} className="relative">
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="object-cover w-full h-[200px] rounded-b-md"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1D1E20]/40 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center px-4 flex-col bg-gradient-to-t from-[#1D1E20]/40 to-transparent">
                        <h1 className="text-white text-3xl font-bold text-center drop-shadow-lg">
                          {banner.title}
                        </h1>
                        <h1 className="text-white text-md text-center drop-shadow-lg italic">
                          ~ {banner.subTitle} ~
                        </h1>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="relative">
                  <img
                    src={bannerData[0]?.imageUrl}
                    alt={bannerData[0]?.title}
                    className="object-cover w-full h-[200px] rounded-b-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1E20]/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center px-4 flex-col bg-gradient-to-t from-[#1D1E20]/40 to-transparent">
                    <h1 className="text-white text-3xl font-bold text-center drop-shadow-lg">
                      {bannerData[0]?.title}
                    </h1>
                    <h1 className="text-white text-md text-center drop-shadow-lg italic">
                      ~ {bannerData[0]?.subTitle} ~
                    </h1>
                  </div>
                </div>
              )}

              {bannerData.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
                  <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    {bannerData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-white' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { BrandSection } from "./BrandSection";
import HeadInfoAccount from "../../components/HeadInfo";
import HeroSection from "./HeroSection";
import { CameraSection } from "./MainCamera";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#E9F3F4]">
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-xl">
        <main className="flex-1 pb-16">
          <HeadInfoAccount />
          <HeroSection />
          <BrandSection/>
          <CameraSection/>
        </main>
      </div>
    </div>
  );
};

export default Home;
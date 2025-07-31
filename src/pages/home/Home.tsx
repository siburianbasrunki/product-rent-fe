import HeadInfoAccount from "../../components/HeadInfo";
// import { CategorySection } from "./Category";
import HeroSection from "./HeroSection";
import { ProductSection } from "./MainProduct";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-xl">
        <main className="flex-1 pb-16">
          <HeadInfoAccount />
          <HeroSection />
          {/* <CategorySection /> */}
          <ProductSection />
          {/* <ProductSection /> */}
        </main>
      </div>
    </div>
  );
};

export default Home;

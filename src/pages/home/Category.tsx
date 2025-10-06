import { useCategory } from "../../hook/categories";
import { EmptyState } from "../../components/EmptyState";
import { useNavigate } from "react-router-dom";
import { SkeletonCard } from "../../components/Skeleton";
// import { FaArrowRight } from "react-icons/fa";

export const CategorySection = () => {
  const navigate = useNavigate();
  const { data: category, isLoading, isError, error } = useCategory();

  if (isLoading) return <SkeletonCard />;
  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="px-4 py-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-md font-bold text-[#033247]">Kategori Produk</h2>
      </div>

      {category?.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">Belum ada kategori tersedia</p>
        </div>
      ) : (
        <div
          className={`flex flex-wrap ${
            category && category?.length < 4 ? "justify-center" : ""
          } gap-4`}
        >
          {category?.map((category) => (
            <div
              key={category.id}
              className="relative w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5rem)] h-40 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(`/product?category=${category.name}`)}
            >
              <img
                src={category.img}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-medium text-lg drop-shadow-md">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

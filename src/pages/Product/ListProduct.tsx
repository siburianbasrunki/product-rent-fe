import { useNavigate, useSearchParams } from "react-router-dom";
import { formatRupiah } from "../../helper/formatRupiah";
import { EmptyState } from "../../components/EmptyState";
import { useState } from "react";
import { FaSpinner, FaSearch, FaStar, FaFilter, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDebounce } from "../../hook/debunce";
import { useProducts } from "../../hook/product";
import { BiBox } from "react-icons/bi";
import { useCategory } from "../../hook/categories";

const ProductListPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const {data: categories} = useCategory();
  const currentCategory = searchParams.get("category_id") || "";
  const currentSort = searchParams.get("sort") || "";
  const [showFilters, setShowFilters] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useProducts({
    search: debouncedSearchTerm,
    category_id: currentCategory,
    sort: currentSort
  });

  const handleCategoryChange = (categoryId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (categoryId) {
      newSearchParams.set("category_id", categoryId);
    } else {
      newSearchParams.delete("category_id");
    }
    setSearchParams(newSearchParams);
  };

  const handleSortChange = (sortValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (sortValue) {
      newSearchParams.set("sort", sortValue);
    } else {
      newSearchParams.delete("sort");
    }
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setSearchTerm("");
    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
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
    <div className="min-h-screen bg-[#E9F3F4] flex-1 flex flex-col pb-20">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8 animate-fadeIn">
          <div className="p-3 bg-[#033247] rounded-xl shadow-lg transform transition-transform hover:scale-105">
            <BiBox className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#033247]">Product Rental</h1>
            <p className="text-[#1D1E20]/60">
              Find your perfect product to rent
            </p>
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-xl shadow-md text-[#033247] font-medium hover:bg-[#f0f0f0] transition-colors"
          >
            <div className="flex items-center gap-2">
              <FaFilter />
              <span>Search & Filter Options</span>
            </div>
            {showFilters ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6 animate-slideDown space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaSearch className="text-[#1D1E20]/40" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-3 pl-12 pr-12 rounded-xl border-none bg-[#E9F3F4] focus:ring-2 focus:ring-[#2A8E9E] text-[#1D1E20] placeholder-[#1D1E20]/40 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#1D1E20]/40 hover:text-[#033247] transition-colors"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#033247] mb-2">Category</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`py-2 px-3 rounded-lg text-sm ${!currentCategory ? 'bg-[#033247] text-white' : 'bg-[#E9F3F4] text-[#033247]'}`}
                >
                  All
                </button>
                {categories?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`py-2 px-3 rounded-lg text-sm truncate ${currentCategory === category.id ? 'bg-[#033247] text-white' : 'bg-[#E9F3F4] text-[#033247]'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#033247] mb-2">Sort By</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSortChange("")}
                  className={`py-2 px-3 rounded-lg text-sm ${!currentSort ? 'bg-[#033247] text-white' : 'bg-[#E9F3F4] text-[#033247]'}`}
                >
                  Default
                </button>
                <button
                  onClick={() => handleSortChange("1")}
                  className={`py-2 px-3 rounded-lg text-sm ${currentSort === "1" ? 'bg-[#033247] text-white' : 'bg-[#E9F3F4] text-[#033247]'}`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleSortChange("2")}
                  className={`py-2 px-3 rounded-lg text-sm ${currentSort === "2" ? 'bg-[#033247] text-white' : 'bg-[#E9F3F4] text-[#033247]'}`}
                >
                  Price: High to Low
                </button>
                
              </div>
            </div>

            {(currentCategory || currentSort || debouncedSearchTerm) && (
              <button
                onClick={clearFilters}
                className="w-full mt-2 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Active Filters */}
        {(currentCategory || currentSort || debouncedSearchTerm) && (
          <div className="flex flex-wrap gap-2 mb-6 animate-fadeIn">
            {debouncedSearchTerm && (
              <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm text-sm">
                <span>Search: {debouncedSearchTerm}</span>
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 text-[#1D1E20]/60 hover:text-[#033247]"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
            
            {currentCategory && (
              <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm text-sm">
                <span>Category: {categories?.find(c => c.id === currentCategory)?.name}</span>
                <button
                  onClick={() => handleCategoryChange("")}
                  className="ml-1 text-[#1D1E20]/60 hover:text-[#033247]"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
            
            {currentSort && (
              <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm text-sm">
                <span>
                  Sort: {
                    currentSort === "1" ? "Price: Low to High" :
                    currentSort === "2" ? "Price: High to Low" :
                    currentSort === "3" ? "Most Popular" : "Newest First"
                  }
                </span>
                <button
                  onClick={() => handleSortChange("")}
                  className="ml-1 text-[#1D1E20]/60 hover:text-[#033247]"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
          </div>
        )}

        {debouncedSearchTerm && (
          <p className="text-sm text-[#1D1E20]/70 mb-6 px-2 animate-fadeIn">
            Showing results for:{" "}
            <span className="font-medium text-[#033247]">
              "{debouncedSearchTerm}"
            </span>
          </p>
        )}

        {isError ? (
          <EmptyState title={error.message} />
        ) : products?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
            <div className="p-6 bg-white rounded-full shadow-lg mb-4 transform transition-transform hover:scale-110">
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
          <div className="grid grid-cols-1 gap-4">
            {products?.map((product, index) => (
              <div
                key={product.id}
                className="bg-gradient-to-r from-[#033247] to-[#2A8E9E] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#033247] relative group"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animation: "fadeIn 0.6s ease-out forwards",
                }}
              >
                <div className="relative">
                  <div className="w-full h-40 flex items-center justify-center bg-[#E9F3F4] relative overflow-hidden group-hover:bg-[#D4E7E9] transition-colors duration-300">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
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
                      <span className="text-xs text-[#E9F3F4]/80 font-medium truncate">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-[#E9F3F4]/80 font-medium">
                        Daily rate
                      </p>
                      <p className="text-base font-bold text-white">
                        {formatRupiah(product.price)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      className="px-4 py-1.5 bg-white text-[#033247] rounded-md text-sm font-medium shadow hover:shadow-md transition hover:bg-[#E9F3F4] hover:scale-105 active:scale-95"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
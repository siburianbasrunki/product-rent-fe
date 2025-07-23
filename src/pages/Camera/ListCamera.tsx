import { useNavigate, useSearchParams } from "react-router-dom";
import { formatRupiah } from "../../helper/formatRupiah";
import { EmptyState } from "../../components/EmptyState";
import { useCamera } from "../../hook/camera";
import { useState } from "react";
import { FaSpinner, FaSearch, FaCamera, FaStar, FaHeart } from "react-icons/fa";
import { useDebounce } from "../../hook/debunce";

const CameraListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: cameras, isLoading, isError, error } = useCamera(debouncedSearchTerm);

  const toggleLike = (id: string) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(id)) {
      newLikedItems.delete(id);
    } else {
      newLikedItems.add(id);
    }
    setLikedItems(newLikedItems);
  };

  if (isLoading && !cameras) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E9F3F4] to-white p-4 flex justify-center items-center">
        <div className="animate-spin">
          <FaSpinner className="text-3xl text-[#2A8E9E]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#E9F3F4] to-white pb-20">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8 animate-fadeIn">
          <div className="p-3 bg-[#033247] rounded-xl shadow-lg">
            <FaCamera className="text-white text-xl" />
          </div>
          <div>
            <p className="text-[#1D1E20]/60">Find your perfect photography companion</p>
          </div>
        </div>

        <div className="mb-8 relative animate-fadeIn">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FaSearch className="text-[#1D1E20]/40" />
            </div>
            <input
              type="text"
              placeholder="Search cameras, brands..."
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
          <p className="text-sm text-[#1D1E20]/70 mb-6 px-2 animate-fadeIn">
            Showing results for: <span className="font-medium text-[#033247]">"{debouncedSearchTerm}"</span>
          </p>
        )}

        <div className="grid grid-cols-1 gap-6">
          {isError ? (
            <EmptyState title={error.message} />
          ) : cameras?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
              <div className="p-6 bg-white rounded-full shadow-lg mb-4">
                <FaCamera className="text-4xl text-[#2A8E9E]" />
              </div>
              <h3 className="text-xl font-bold text-[#033247] mb-2">
                {debouncedSearchTerm ? "No cameras found" : "No cameras available"}
              </h3>
              <p className="text-[#1D1E20]/60 text-center max-w-md">
                {debouncedSearchTerm
                  ? `We couldn't find any cameras matching "${debouncedSearchTerm}"`
                  : "Check back later for new arrivals"}
              </p>
            </div>
          ) : (
            cameras?.map((camera, index) => (
              <div
                key={camera.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative">
                  <div className="w-full h-64 flex items-center justify-center bg-[#E9F3F4]">
                    <img
                      src={camera.imageUrl}
                      alt={camera.name}
                      className="max-h-full max-w-full object-contain p-4"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                  {!camera.avaliable && (
                    <div className="absolute top-4 left-4 bg-[#033247] text-white text-xs px-3 py-1 rounded-full font-medium">
                      Currently Rented
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(camera.id);
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full backdrop-blur-sm"
                  >
                    <FaHeart
                      className={`text-lg ${likedItems.has(camera.id) ? "text-red-500 fill-red-500" : "text-[#1D1E20]/40"}`}
                    />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={camera.brand.imageUrl}
                          alt={camera.brand.name}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="text-xs font-medium text-[#1D1E20]/70">
                          {camera.brand.name}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#033247]">{camera.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-[#E9F3F4] px-2 py-1 rounded-full">
                      <FaStar className="text-yellow-400 text-xs" />
                      <span className="text-xs font-bold text-[#033247]">4.8</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-sm text-[#1D1E20]/60">Daily rate</p>
                      <p className="text-xl font-bold text-[#2A8E9E]">
                        {formatRupiah(camera.price)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/camera/${camera.id}`);
                      }}
                      className="px-5 py-2 bg-gradient-to-r from-[#033247] to-[#2A8E9E] text-white rounded-full font-medium shadow-md hover:scale-105 transition-transform"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraListPage;
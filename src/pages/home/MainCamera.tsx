import { FaArrowRight } from "react-icons/fa";
import { formatRupiah } from "../../helper/formatRupiah";
import { useNavigate } from "react-router-dom";
import { useCamera } from "../../hook/camera";
import { CardSkeleton } from "../../components/Skeleton";
import { EmptyState } from "../../components/EmptyState";
import { FaCamera } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export const CameraSection = () => {
  const navigate = useNavigate();
  const { data: cameras, isLoading, isError, error } = useCamera();

  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="p-6 mb-[20px]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-[#033247]">All Product</h2>
        </div>
        {cameras?.length === 0 ? null : (
          <button
            onClick={() => navigate("/camera")}
            className="flex items-center gap-1 text-[#2A8E9E] hover:text-[#033247] transition-colors duration-300 cursor-pointer"
          >
            <span className="text-sm font-medium">View All</span>
            <FaArrowRight className="text-sm" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {cameras?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 bg-white rounded-2xl shadow-sm">
            <FaCamera className="text-3xl text-[#2A8E9E] mb-3" />
            <p className="text-[#1D1E20]/70">No cameras available</p>
          </div>
        ) : (
          cameras?.slice(0, 3).map((camera) => (
            <div
              key={camera.id}
              onClick={() => navigate(`/camera/${camera.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-full h-48 flex items-center justify-center bg-[#E9F3F4]">
                <img
                  src={camera.imageUrl}
                  alt={camera.name}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={camera.brand.imageUrl}
                        alt={camera.brand.name}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-xs font-medium text-[#1D1E20]/70">
                        {camera.brand.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#033247] line-clamp-1">
                      {camera.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 bg-[#E9F3F4] px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs font-bold text-[#033247]">
                      4.8
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-[#1D1E20]/60">Daily rate</p>
                    <p className="text-lg font-bold text-[#2A8E9E]">
                      {formatRupiah(camera.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/camera/${camera.id}`);
                    }}
                    className="px-4 py-1.5 bg-gradient-to-r from-[#033247] to-[#2A8E9E] text-white rounded-full text-sm font-medium shadow hover:shadow-md transition"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

import { FaArrowRight } from "react-icons/fa";
import { formatRupiah } from "../../helper/formatRupiah";
import { useNavigate } from "react-router-dom";
import { useCamera } from "../../hook/camera";
import { CardSkeleton } from "../../components/Skeleton";
import { EmptyState } from "../../components/EmptyState";

export const CameraSection = () => {
  const navigate = useNavigate();
  const { data: cameras, isLoading, isError, error } = useCamera();

  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-xl font-bold text-[#033247]">List Camera</p>
        {cameras?.length === 0 ? null : (
          <FaArrowRight
            className="w-10 h-5 text-[#2A8E9E] cursor-pointer"
            onClick={() => navigate("/camera")}
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {cameras?.length === 0 ? (
          <EmptyState title="Tidak ada data camera tersimpan" />
        ) : (
          cameras?.slice(0, 3).map((camera) => (
            <div
              key={camera.id}
              onClick={() => navigate(`/camera/${camera.id}`)}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 border border-[#E9F3F4] flex flex-col cursor-pointer"
            >
              <div className="flex justify-center items-center p-4">
                <img
                  src={camera.imageUrl}
                  alt={camera.name}
                  className="w-48 h-48 object-cover rounded-md"
                />
              </div>

              <div className="px-4 pb-4 flex flex-col gap-2">
                <p className="text-lg font-semibold text-[#1D1E20]">
                  {camera.name}
                </p>
                <p className="text-[#2A8E9E]">
                  {formatRupiah(camera.price)} / day
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

import { FaArrowRight } from "react-icons/fa";
import { formatRupiah } from "../../helper/formatRupiah";
import { useNavigate } from "react-router-dom";
import { CardSkeleton } from "../../components/Skeleton";
import { EmptyState } from "../../components/EmptyState";
import { FaCamera } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useProducts } from "../../hook/product";

export const ProductSection = () => {
  const navigate = useNavigate();
  const { data: products, isError, isLoading, error } = useProducts();
  console.log(
    "products",
    products?.map((product) => product.name)
  );

  if (isLoading) return <CardSkeleton />;
  if (isError) return <EmptyState title={error.message} />;

  return (
    <div className="p-4 mb-[20px] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-bold text-[#033247]">Semua Product</h2>
        </div>
        {products?.length === 0 ? null : (
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-1 text-[#2A8E9E] hover:text-[#033247] transition-colors duration-300 cursor-pointer"
          >
            <span className="text-sm font-medium">Lihat Semua</span>
            <FaArrowRight className="text-sm" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {products?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 bg-white rounded-2xl shadow-sm">
            <FaCamera className="text-3xl text-[#2A8E9E] mb-3" />
            <p className="text-[#1D1E20]/70">No cameras available</p>
          </div>
        ) : (
          products?.slice(0, 3).map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/camera/${product.id}`)}
              className="bg-gradient-to-r from-[#033247] to-[#2A8E9E] rounded-md overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-full h-48 flex items-center justify-center bg-[#E9F3F4]">
                <img
                  src={product.img}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain p-4"
                />
              </div>

              <div className="p-5 text-white"> 
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[#E9F3F4]"> 
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white line-clamp-1"> 
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm"> {/* Tambahkan efek transparan */}
                    <FaStar className="text-yellow-400 text-xs" />
                    <span className="text-xs font-bold text-white"> 
                      4.8
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-[#E9F3F4]">Daily rate</p> 
                    <p className="text-lg font-bold text-white"> 
                      {formatRupiah(product.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="px-4 py-1.5 bg-white text-[#033247] rounded-md text-sm font-medium shadow hover:shadow-md transition hover:bg-[#E9F3F4]" 
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
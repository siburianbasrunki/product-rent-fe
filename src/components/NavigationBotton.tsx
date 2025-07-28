import { Link, useLocation } from "react-router-dom";
import { FaHome, FaClipboardList, FaUser } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import { BiBox } from "react-icons/bi";

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto w-full px-4 pb-4 bg-[#033247] rounded">
        <div className="relative">
          <div className="p-2 flex justify-around items-center">
            <Link
              to="/"
              className={`p-2 ${
                isActive("/") ? "text-[#E9F3F4]" : "text-[#E9F3F4]"
              } hover:text-[#2A8E9E]`}
            >
              <div className="flex flex-col items-center">
                <FaHome className="w-6 h-6" />
                <p className="text-xs text-center">Home</p>
              </div>
            </Link>

            <Link
              to="/balance"
              className={`p-2 ${
                isActive("/balance") ? "text-[#E9F3F4]" : "text-[#E9F3F4]"
              } hover:text-[#2A8E9E]`}
            >
              <div className="flex flex-col items-center">
                <MdCreditCard className="w-6 h-6" />
                <p className="text-xs text-center">Balance</p>
              </div>
            </Link>

            <div className="relative -mt-12">
              <Link
                to="/product"
                className={`flex items-center justify-center w-16 h-16 rounded-full ${
                  isActive("/camera") ? "bg-[#033247]" : "bg-[#2A8E9E]"
                } text-[#E9F3F4] shadow-lg hover:bg-[#033247] transition-all`}
              >
                <BiBox className="w-8 h-8" />
              </Link>
            </div>

            <Link
              to="/booking"
              className={`p-2 ${
                isActive("/booking") ||
                location.pathname.startsWith("/booking/")
                  ? "text-[#E9F3F4]"
                  : "text-[#E9F3F4]"
              } hover:text-[#2A8E9E]`}
            >
              <div className="flex flex-col items-center">
                <FaClipboardList className="w-6 h-6" />
                <p className="text-xs text-center">Booking</p>
              </div>
            </Link>

            <Link
              to="/profile"
              className={`p-2 ${
                isActive("/profile") ? "text-[#E9F3F4]" : "text-[#E9F3F4]"
              } hover:text-[#2A8E9E]`}
            >
              <div className="flex flex-col items-center">
                <FaUser className="w-6 h-6" />
                <p className="text-xs text-center">Profile</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
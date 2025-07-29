import { BiSolidEdit } from "react-icons/bi";
import { FaClipboardList, FaSpinner } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile} from "../../hook/user";
import { useConfirmation } from "../../components/PopUp";
import { useState } from "react";
import EditProfileModal from "./editProfile";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: user, isLoading } = useProfile();

  const { showConfirmation } = useConfirmation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleLogout = () => {
    showConfirmation("Apakah Anda yakin ingin logout?", () => {
      logout();
      navigate("/login", { replace: true });
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E9F3F4] p-4 flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-[#2A8E9E]" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#E9F3F4]">
        <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-sm">
          <div className="text-center mt-2">
            <h1 className="text-xl font-bold p-4 text-[#033247]">Profile</h1>
          </div>

          <div className=" px-4 flex justify-between items-center bg-white rounded-lg mx-4 mt-2 shadow-sm">
            <div className="flex items-center gap-3 p-3">
              <img
                src={user?.img || ""}
                alt="user"
                className="w-16 h-16 rounded-lg object-cover border-2 border-[#2A8E9E]/30"
              />
              <div>
                <p className="text-lg font-semibold leading-6 text-[#033247]">
                  {user?.name || "-"}
                </p>
                <p className="text-md leading-5 text-[#033247]/80">
                  {user?.email || "-"}
                </p>
              </div>
            </div>
            <div>
              <BiSolidEdit
                className="w-6 h-6 text-[#2A8E9E] cursor-pointer hover:text-[#033247] transition-colors duration-300"
                onClick={() => setIsEditModalOpen(true)}
              />
            </div>
          </div>

          <div className="w-full px-4 mt-6 space-y-2">
            <div
              className="flex items-center gap-2 p-3 justify-between cursor-pointer bg-white rounded-lg hover:bg-[#E9F3F4] transition-colors duration-300 shadow-sm"
              onClick={() => navigate("/booking")}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E9F3F4] rounded-lg">
                  <FaClipboardList className="w-5 h-5 text-[#2A8E9E]" />
                </div>
                <p className="text-md font-medium text-[#033247]">My Booking</p>
              </div>
              <div>
                <IoIosArrowForward className="w-5 h-5 text-[#2A8E9E]" />
              </div>
            </div>

            <div
              className="flex items-center gap-2 p-3 justify-between cursor-pointer bg-white rounded-lg hover:bg-[#E9F3F4] transition-colors duration-300 shadow-sm"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E9F3F4] rounded-lg">
                  <IoLogOutOutline className="w-5 h-5 text-[#2A8E9E]" />
                </div>
                <p className="text-md font-medium text-[#033247]">Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={{
          name: user?.name || "",
          img: user?.img || "",
        }}
      />
    </>
  );
};

export default Profile;

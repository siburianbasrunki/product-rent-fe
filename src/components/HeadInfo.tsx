import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUserById } from "../hook/user";

const HeadInfoAccount = () => {
  const navigate = useNavigate();
  const { user, setToken, token } = useAuth();
  const { data } = useUserById();
  console.log(`token: ${token}`);
  console.log(`setToken: ${setToken}`);

  return (
    <div className="sticky top-0 left-0 right-0 z-50 ">
      <div className="flex items-center justify-between gap-2 p-3 bg-[#033247] rounded-b-md">
        <div>
          <p className="text-md  leading-6 text-white">Hai, {user?.name}!</p>
          <p className="text-sm  leading-5 text-gray-200">
            selemat datang di rent-app
          </p>
        </div>
        <img
          onClick={() => {
            navigate("/profile");
          }}
          src={data?.imageUrl || ""}
          alt="user"
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-white object-cover object-center hover:border-[#2A8E9E]"
        />
      </div>
    </div>
  );
};
export default HeadInfoAccount;

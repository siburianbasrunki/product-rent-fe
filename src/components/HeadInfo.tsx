import { useNavigate } from "react-router-dom";
import { useProfile } from "../hook/user";
import imgProfile from "../assets/download (5).jpg";

const HeadInfoAccount = () => {
  const navigate = useNavigate();
  const { data: user } = useProfile();
  console.log("user", user);

  const isUser = user?.name;
  return (
    <div className="sticky top-0 left-0 right-0 z-50 ">
      <div className="flex items-center justify-between gap-2 p-3 bg-[#033247] rounded-b-md">
        <div>
          {isUser ? (
            <>
              <p className="text-md  leading-6 text-white">
                Hai, {user?.name}!
              </p>
              <p className="text-sm  leading-5 text-gray-200">
                selemat datang di rent-app
              </p>
            </>
          ) : (
            <>
              <p className="text-sm  leading-5 text-gray-200">
                selemat datang di rent-app
              </p>
            </>
          )}
        </div>
        {isUser && (
          <img
            onClick={() => {
              navigate("/profile");
            }}
            src={user?.img || imgProfile}
            alt="user"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-white object-cover object-center hover:border-[#2A8E9E]"
          />
        )}
      </div>
    </div>
  );
};
export default HeadInfoAccount;

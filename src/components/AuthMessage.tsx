import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface AuthMessageProps {
  message: string;
  children: React.ReactNode;
  actionText?: string;
  actionPath?: string;
}

export const AuthMessage = ({
  message,
  children,
  actionText = "Login",
  actionPath = "/login",
}: AuthMessageProps) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div className="max-w-md mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Kamu Tidak Memiliki Akses
          </h3>
          <p className="text-gray-500 mb-6">{message}</p>
          <button
            onClick={() => navigate(actionPath)}
            className="w-full max-w-xs  outline-1 outline-[#2A8E9E] rounded-md py-2 px-4 text-[#2A8E9E] hover:bg-[#2A8E9E] hover:text-white transition duration-300 ease-in-out"
          >
            {actionText}
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

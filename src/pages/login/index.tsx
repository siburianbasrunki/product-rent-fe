import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setEmail: setAuthEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await AuthService.requestOtp(email);
      setAuthEmail(email);
      navigate("/otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9F3F4] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-[#2A8E9E]/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#033247]">Login</h2>
          <p className="text-[#1D1E20]/60 mt-1">Masukkan email untuk melanjutkan</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#033247] mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-[#2A8E9E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A8E9E] focus:border-[#2A8E9E]"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#2A8E9E] to-[#033247] text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                "Mengirim..."
              ) : (
                <>
                  <IoIosSend className="w-5 h-5" />
                  Kirim OTP
                </>
              )}
            </div>
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#1D1E20]/70">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#2A8E9E] hover:text-[#033247] font-medium transition-colors">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};
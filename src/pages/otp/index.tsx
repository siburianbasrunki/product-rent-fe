import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";
import { useAuth } from "../../context/AuthContext";

export const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { email, setToken, setUser } = useAuth();

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length !== 4) {
      setError("Masukkan 4 digit kode OTP yang valid");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { token, user } = await AuthService.verifyOtp(email, otpCode);
      setToken(token);
      setUser(user);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP tidak valid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9F3F4] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-[#2A8E9E]/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#033247]">Verifikasi OTP</h2>
          <p className="text-[#1D1E20]/60 mt-1">Kami telah mengirim kode ke {email}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  className="w-16 h-16 text-center text-2xl border border-[#2A8E9E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A8E9E] focus:border-[#2A8E9E]"
                  placeholder="0"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#2A8E9E] to-[#033247] text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50"
          >
            {loading ? "Memverifikasi..." : "Verifikasi"}
          </button>
        </form>
      </div>
    </div>
  );
};

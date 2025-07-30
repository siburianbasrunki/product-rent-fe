import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";
import { useAuth } from "../../context/AuthContext";

export const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { email, setToken, setUser } = useAuth();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    const digits = pastedData.replace(/\D/g, "").slice(0, 4);

    if (digits.length > 0) {
      const newOtp = ["", "", "", ""];

      for (let i = 0; i < digits.length && i < 4; i++) {
        newOtp[i] = digits[i];
      }

      setOtp(newOtp);

      const nextIndex = Math.min(digits.length, 3);
      inputRefs.current[nextIndex]?.focus();
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
          <p className="text-[#1D1E20]/60 mt-1">
            Kami telah mengirim kode ke {email}
          </p>
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
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  className="w-16 h-16 text-center text-2xl border border-[#2A8E9E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A8E9E] focus:border-[#2A8E9E] transition-all"
                  placeholder="0"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
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

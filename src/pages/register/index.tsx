import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await AuthService.register(name, email);
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Pendaftaran gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9F3F4] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-[#2A8E9E]/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#033247]">Daftar Akun</h2>
          <p className="text-[#1D1E20]/60 mt-1">Buat akun untuk memulai</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#033247] mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-[#2A8E9E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A8E9E] focus:border-[#2A8E9E]"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#1D1E20]/70">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-[#2A8E9E] hover:text-[#033247] font-medium transition-colors">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};
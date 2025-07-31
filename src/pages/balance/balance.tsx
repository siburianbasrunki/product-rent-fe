import { useState } from "react";

export const BalancePage = () => {
  const [balance, setBalance] = useState(250000);
  const [showTopUpForm, setShowTopUpForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState([
    { id: 1, amount: 100000, date: "01 Aug 2024", time: "14:30" },
    { id: 2, amount: 150000, date: "05 Aug 2024", time: "09:15" },
  ]);

  const handleTopUpClick = () => {
    setShowTopUpForm(!showTopUpForm);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };

  const handleSuggestedAmount = (suggestedAmount: number) => {
    setAmount(suggestedAmount.toString());
  };

  const handlePay = () => {
    if (!amount || isNaN(Number(amount))) return;

    const newAmount = Number(amount);
    const newBalance = balance + newAmount;
    const now = new Date();
    const newHistoryItem = {
      id: history.length + 1,
      amount: newAmount,
      date: now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setBalance(newBalance);
    setHistory([newHistoryItem, ...history]);
    setAmount("");
    setShowTopUpForm(false);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-r from-[#033247] to-[#2A8E9E] rounded-2xl shadow-xl overflow-hidden mb-8 text-white">
          <div className="p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-sm opacity-80">Saldo</p>
                <h2 className="text-xl font-bold">Rent-Product</h2>
              </div>
              <div className="bg-white/20 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm opacity-80 mb-1">Saldo Tersedia</p>
              <p className="text-3xl font-bold tracking-wide">
                Rp{balance.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex justify-between items-end text-sm">
              <p className="opacity-80">Nama Akun</p>
              <p>Basxxxxzzz</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleTopUpClick}
          className="w-full bg-gradient-to-r from-[#2A8E9E] to-[#033247] text-white py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium mb-8 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {showTopUpForm ? "Cancel" : "Isi Saldo"}
        </button>

        {showTopUpForm && (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8 p-6">
            <h3 className="font-bold text-lg text-[#033247] mb-4">Isi Saldo</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Top Up
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  Rp
                </span>
                <input
                  type="text"
                  value={amount ? parseInt(amount).toLocaleString("id-ID") : ""}
                  onChange={handleAmountChange}
                  placeholder="Masukkan jumlah"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8E9E] focus:border-[#2A8E9E]"
                />
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">Pilih nominal:</p>
              <div className="grid grid-cols-3 gap-3">
                {[50000, 100000, 150000].map((nominal) => (
                  <button
                    key={nominal}
                    onClick={() => handleSuggestedAmount(nominal)}
                    className={`py-2 px-3 rounded-lg border ${
                      amount === nominal.toString()
                        ? "bg-[#E9F3F4] border-[#2A8E9E] text-[#033247]"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {nominal.toLocaleString("id-ID")}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={!amount}
              className={`w-full py-3 px-6 rounded-xl shadow-md font-medium flex items-center justify-center gap-2 ${
                amount
                  ? "bg-gradient-to-r from-[#2A8E9E] to-[#033247] text-white hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Bayar Sekarang
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-lg text-[#033247]">Riwayat Top Up</h3>
          </div>

          {history.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Belum ada riwayat transaksi
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {history.map((item) => (
                <li
                  key={item.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">Top Up Saldo</p>
                      <p className="text-sm text-gray-500">
                        {item.date} • {item.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#2A8E9E]">
                        +Rp{item.amount.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-green-500 font-medium">
                        Berhasil
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

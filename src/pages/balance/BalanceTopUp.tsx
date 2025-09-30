import React from "react";

type Props = {
  amount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestedAmount: (amount: number) => void;
  onPayNow: () => void;
  isPending?: boolean;
  errorMessage?: string;
};

export const BalanceTopUp: React.FC<Props> = ({
  amount,
  onAmountChange,
  onSuggestedAmount,
  onPayNow,
  isPending,
  errorMessage,
}) => {
  const suggested = [50_000, 100_000, 150_000];

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8 p-6 border border-[#E9F3F4]">
      <h3 className="font-bold text-lg text-[#033247] mb-4">Isi Saldo</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-[#1D1E20] mb-2">
          Jumlah Top Up
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            Rp
          </span>
          <input
            type="text"
            value={amount ? parseInt(amount).toLocaleString("id-ID") : ""}
            onChange={onAmountChange}
            placeholder="Masukkan jumlah"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8E9E] focus:border-[#2A8E9E]"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-[#1D1E20] mb-3">Pilih nominal:</p>
        <div className="grid grid-cols-3 gap-3">
          {suggested.map((nominal) => (
            <button
              key={nominal}
              onClick={() => onSuggestedAmount(nominal)}
              className={`py-2 px-3 rounded-lg border ${
                amount === String(nominal)
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
        onClick={onPayNow}
        disabled={!amount || isPending}
        className={`w-full py-3 px-6 rounded-xl shadow-md font-medium flex items-center justify-center gap-2 ${
          amount && !isPending
            ? "bg-[#2A8E9E] text-white hover:bg-[#033247] hover:shadow-lg"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isPending ? "Memproses..." : "Bayar Sekarang"}
      </button>

      {errorMessage && (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

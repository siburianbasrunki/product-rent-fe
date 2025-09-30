import { useState } from "react";
import { AuthMessage } from "../../components/AuthMessage";
import { useProfile } from "../../hook/user";
import {
  useCredit,
  useHistoryTopUpCredit,
  useAddCredit,
} from "../../hook/credit";
import { formatMoneyIDR } from "../../helper/topup";
import toast from "react-hot-toast";
import { BalanceTopUp } from "./BalanceTopUp";
import { BalanceHistory } from "./BalanceHistory";

export const BalancePage = () => {
  const { data: credit } = useCredit();
  const { data: history } = useHistoryTopUpCredit();
  const addCreditMutation = useAddCredit();
  const { data: user } = useProfile();

  const [showTopUpForm, setShowTopUpForm] = useState(false);
  const [amount, setAmount] = useState("");

  const handleTopUpClick = () => setShowTopUpForm((v) => !v);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };

  const handleSuggestedAmount = (suggestedAmount: number) => {
    setAmount(String(suggestedAmount));
  };

  const handlePayNow = async () => {
    if (!amount) return;
    const parsed = parseInt(amount, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      toast.error("Nominal tidak valid");
      return;
    }

    const p = addCreditMutation.mutateAsync({ amount: parsed, type: 1 });
    toast.promise(p, {
      loading: "Memproses pembayaran...",
      success: "Top up berhasil!",
      error: (err: any) => err?.message ?? "Top up gagal",
    });

    try {
      await p;
      setShowTopUpForm(false);
      setAmount("");
    } catch {
    }
  };

  return (
    <AuthMessage
      message="Anda belum login. Silakan login dan top up saldo Rent Up Anda"
      actionText="Login"
    >
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-md mx-auto">
          {/* Card Saldo */}
          <div className="bg-[#033247] rounded-2xl shadow-xl overflow-hidden mb-8 text-white">
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
                  Rp{credit?.balance?.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="flex justify-between items-end text-sm">
                <p className="opacity-80">Nama Akun</p>
                <p>{user?.name}</p>
              </div>
            </div>
          </div>

          {/* Tombol Toggle Top Up */}
          <button
            onClick={handleTopUpClick}
            className="w-full bg-[#2A8E9E] text-white py-3 px-6 rounded-xl shadow-md hover:bg-[#033247] transition-all duration-300 font-medium mb-8 flex items-center justify-center gap-2"
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
            <BalanceTopUp
              amount={amount}
              onAmountChange={handleAmountChange}
              onSuggestedAmount={handleSuggestedAmount}
              onPayNow={handlePayNow}
              isPending={addCreditMutation.isPending}
              errorMessage={
                addCreditMutation.isError
                  ? (addCreditMutation.error as any)?.message ??
                    "Terjadi kesalahan"
                  : undefined
              }
            />
          )}

          <BalanceHistory
            history={history ?? []}
            formatMoney={(n: number) => formatMoneyIDR(n)}
          />
        </div>
      </div>
    </AuthMessage>
  );
};

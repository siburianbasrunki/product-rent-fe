import React from "react";
import toast from "react-hot-toast";
import {
  formatDateTimeWIB,
  getTopupStatusUi,
  isAwaitingPayment,
} from "../../helper/topup";
import type { HistoryTopUpCreditModel } from "../../model/credit";


type Props = {
  history: HistoryTopUpCreditModel[];
  formatMoney: (n: number) => string;
};

export const BalanceHistory: React.FC<Props> = ({ history, formatMoney }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#E9F3F4]">
      <div className="p-5 border-b border-[#E9F3F4]">
        <h3 className="font-bold text-lg text-[#033247]">Riwayat Transaksi</h3>
      </div>

      {history.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Belum ada riwayat transaksi
        </div>
      ) : (
        <ul className="divide-y divide-[#E9F3F4]">
          {history.map((item) => {
            const statusUi = getTopupStatusUi(item.status);
            const showVA =
              isAwaitingPayment(item.status) && item.virtual_account_id;

            return (
              <li
                key={item.id}
                className="p-4 hover:bg-[#E9F3F4] transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-[#1D1E20]">Top Up Saldo</p>
                    <p className="text-sm text-gray-500">
                      {formatDateTimeWIB(item.created_at)}
                    </p>

                    {showVA && (
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-[#033247] bg-[#E9F3F4] px-2 py-1 rounded">
                          VA: <strong>{item.virtual_account_id}</strong>
                        </span>

                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(
                                item.virtual_account_id as string
                              );
                              toast.success("Nomor VA disalin");
                            } catch {
                              toast.error("Gagal menyalin VA");
                            }
                          }}
                          className="text-xs border border-[#2A8E9E] text-[#2A8E9E] px-2 py-1 rounded hover:bg-[#2A8E9E] hover:text-white transition"
                        >
                          Salin VA
                        </button>

                        <span className="text-xs text-gray-500">
                          {item.expired_at
                            ? ` • Exp: ${formatDateTimeWIB(item.expired_at)}`
                            : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-bold text-[#2A8E9E]">
                      +Rp{formatMoney(item.amount)}
                    </p>
                    <span
                      className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded ${statusUi.className}`}
                    >
                      {statusUi.label}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

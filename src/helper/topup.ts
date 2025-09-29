// src/helper/topup.ts
export type TopupStatus =
  | "PENDING"
  | "ACTIVATED"
  | "SUCCESS"
  | "FAILED"
  | "EXPIRED"
  | string;

export function formatDateTimeWIB(iso?: string, withTime = true) {
  if (!iso) return "-";
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
  if (!withTime) return date;

  const time = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);

  return `${date} ${time} WIB`;
}

export function formatMoneyIDR(n: number) {
  return n.toLocaleString("id-ID");
}

export function getTopupStatusUi(status?: TopupStatus): {
  label: string;
  className: string;
} {
  const s = (status || "").toUpperCase();
  switch (s) {
    case "PENDING":
      return { label: "Menunggu", className: "text-amber-700 bg-amber-100" };
    case "ACTIVATED": 
      return { label: "VA Aktif", className: "text-blue-700 bg-blue-100" };
    case "SUCCESS":
      return { label: "Berhasil", className: "text-green-700 bg-green-100" };
    case "FAILED":
      return { label: "Gagal", className: "text-red-700 bg-red-100" };
    case "EXPIRED":
      return { label: "Kedaluwarsa", className: "text-gray-700 bg-gray-200" };
    default:
      return { label: s || "-", className: "text-slate-700 bg-slate-100" };
  }
}

export function isAwaitingPayment(status?: TopupStatus) {
  const s = (status || "").toUpperCase();
  return s === "ACTIVATED" || s === "PENDING";
}

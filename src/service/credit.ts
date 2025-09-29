import { getEndpoints } from "../config/config";
import type { CreditModel, HistoryTopUpCreditModel } from "../model/credit";

const CreditService = {
  async getCredit(): Promise<CreditModel> {
    const { credit } = getEndpoints();
    const res = await fetch(credit, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) {
      const errorMessage =
        json?.message || json?.error || `HTTP error! status: ${res.status}`;
      throw new Error(errorMessage);
    }
    return json.data;
  },
  async addCredit(amount: number, type: number = 1): Promise<CreditModel> {
    const { credit } = getEndpoints();
    const res = await fetch(`${credit}/topup`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ amount, type }), 
    });
    const json = await res.json();
    if (!res.ok) {
      const errorMessage =
        json?.message || json?.error || `HTTP error! status: ${res.status}`;
      throw new Error(errorMessage);
    }
    return json.data;
  },

  async getHistoryTopUpCredit(): Promise<HistoryTopUpCreditModel[]> {
    const { credit } = getEndpoints();
    const res = await fetch(`${credit}/history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) {
      const errorMessage =
        json?.message || json?.error || `HTTP error! status: ${res.status}`;
      throw new Error(errorMessage);
    }
    return json.data;
  },
};
export default CreditService;

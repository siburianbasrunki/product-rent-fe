import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreditService from "../service/credit";

export const useCredit = () => {
  return useQuery({
    queryKey: ["credit"],
    queryFn: CreditService.getCredit,
  });
};

export const useHistoryTopUpCredit = () => {
  return useQuery({
    queryKey: ["historyTopUpCredit"],
    queryFn: CreditService.getHistoryTopUpCredit,
  });
};

export const useAddCredit = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { amount: number; type?: number }) =>
      CreditService.addCredit(payload.amount, payload.type ?? 1),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["credit"] });
      qc.invalidateQueries({ queryKey: ["historyTopUpCredit"] });
    },
  });
};

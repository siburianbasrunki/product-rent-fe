export interface CreditModel {
    id?: string;
    balance: number;
    amount: number;
    type?: number;
    date?: string;
    time?: string;
}

export interface HistoryTopUpCreditModel {
    id: string;
    amount: number;
    status: string;
    paymentMethod: string;
    payment_id: string;
    virtual_account_id: string;
    created_at: string;
    expired_at: string;
}
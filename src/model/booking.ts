import type { User } from "../service/auth";
import type { Camera } from "./camera";

export type BookingStatus = "PENDING" | "PAID" | "CANCELLED" | "COMPLETED";
export type PaymentMethod = "BANK_TRANSFER" | "QRIS" | "CREDIT_CARD";
export type PaymentStatus = "PENDING" | "SETTLED" | "EXPIRED" | "FAILED";

export interface Booking {
  id: string;
  userId: string;
  cameraId: string;
  date: Date | string;
  startDate: Date | string;
  endDate: Date | string;
  duration: number;
  purpose: string;
  status: BookingStatus;
  totalPrice: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  camera: Camera;
  payment?: Payment;
  user?: User;
  isReturned?: boolean;
  hasReturnProof?: boolean;
}

export interface Payment {
  id: string;
  bookingId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  midtransOrderId?: string;
  paymentCode?: string;
  paymentUrl?: string;
  expiryTime?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface HistoryPayment {
  order_id: string;
  name: string;
  price: number;
  img: string;
  status: string;
  method: string;
  book_date: string;
  expired_date: string;
}

export interface BookingDetailModel{
  id: string;
  user_id: string;
  username: string;
  email: string;
  payment_id: string;
  order_id: string;
  product_detail: {
    name: string;
    price: number;
    description: string[]
  }
  virtual_account_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  expired_at: string;
}

import { getEndpoints } from "../config/config";
import type { Booking, BookingDetailModel, HistoryPayment } from "../model/booking";

// interface CreateBookingData {
//   cameraId: string;
//   date: string;
//   duration: number;
//   purpose: string;
//   paymentMethod: PaymentMethod;
// }
interface UploadResponse {
  url: string;
}


const BookingService = {
  // async createBooking(params: {
  //   product_id: string;
  //   type: number;
  // }): Promise<Booking> {
  //   const { booking } = getEndpoints();
  //   const url = `${booking}?product_id=${params.product_id}&type=${params.type}`;

  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //   const json = await res.json();
  //   return json.data;
  // },

  async createBooking(data: {
  product_id: string;
  start_date: string;
  end_date: string;
  desc: string;
  type: number;
  file: string;
}): Promise<Booking> {
  const { booking } = getEndpoints();
  const res = await fetch(booking, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const json = await res.json();
  return json.data;
},
  async processReturn(
    bookingId: string,
    returnProof: FormData
  ): Promise<Booking> {
    const { booking } = getEndpoints();
    const res = await fetch(`${booking}/${bookingId}/return`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: returnProof,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
  async getUserBookings(): Promise<Booking[]> {
    const { booking } = getEndpoints();
    const res = await fetch(booking, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
  async getHistoryPayment(): Promise<HistoryPayment[]> {
    const { history } = getEndpoints();
    const res = await fetch(history, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
 async uploadImage(file: File): Promise<UploadResponse> {
  const { uploadImg } = getEndpoints();
  const formData = new FormData();
  formData.append("file", file);
  
  const res = await fetch(uploadImg, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return await res.json() as UploadResponse;
},
  async getBookingById(id: string): Promise<BookingDetailModel> {
    const { booking } = getEndpoints();
    const res = await fetch(`${booking}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async checkPaymentStatus(bookingId: string): Promise<any> {
    const { booking } = getEndpoints();
    const res = await fetch(`${booking}/${bookingId}/payment-status`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async cancelBooking(bookingId: string): Promise<Booking> {
    const { booking } = getEndpoints();
    const res = await fetch(`${booking}/${bookingId}/cancel`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
};

export default BookingService;

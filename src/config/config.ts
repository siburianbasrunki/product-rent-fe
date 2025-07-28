export function getEndpoints() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return {
    brand: `${BASE_URL}/brands`,
    camera: `${BASE_URL}/cameras`,
    banner: `${BASE_URL}/product/banner/list`,
    uploadImg: `${BASE_URL}/upload/image`,

    product: `${BASE_URL}/product`,
    auth: `${BASE_URL}/auth`,
    user: `${BASE_URL}/user`,
    booking: `${BASE_URL}/payment/book`,
    history: `${BASE_URL}/payment/history`,
  };
}

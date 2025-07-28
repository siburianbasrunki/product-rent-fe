export interface UserModel {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    img: string;
}

export interface UpdateUserPayload {
  username?: string;
  image?: File | null;
}
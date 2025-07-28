import { getEndpoints } from "../config/config";
import type { UpdateUserPayload, UserModel } from "../model/user";

const UserService = {
  async getUserById(id: string): Promise<UserModel> {
    const { user } = getEndpoints();
    const res = await fetch(`${user}/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
  async updateUser(payload: UpdateUserPayload): Promise<UserModel> {
    const { user } = getEndpoints();
    const res = await fetch(`${user}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  },
};

export default UserService;

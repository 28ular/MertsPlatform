import { api } from "../src/App/api";
import { queryClient } from "../src/main";

export const logout = async () => {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("Ошибка при выходе из системы:", error);
    throw error;
  } finally {
    localStorage.removeItem("accessToken");  
    queryClient.clear(); 
  }
};

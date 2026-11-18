import { api } from "../src/App/api";

export const getAchievements = async () => {
  try {
    const response = await api.get("/achievements");
    return response.data;
  } catch (e) {
    console.error("Ошибка при получении ачивок:", e);
    throw e;
  }
};

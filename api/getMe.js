import { api } from "../src/App/api"

export const getMe = async () => {
    try {
        const response = await api.get('/me')
        return response.data
    } catch(e) {
    console.error("Ошибка при получении профиля:", e);
    throw e;    
   }
}
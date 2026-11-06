import { api } from './../src/App/api';


export const getLes = async () => {
    try {
        const responce = await api.get('/lessons')
        return responce.data
    }catch(e) {
        console.log('упс ошибка при получений уроков:' + e)
        return [];
    }
}
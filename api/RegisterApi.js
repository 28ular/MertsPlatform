import { api } from "../src/App/api";

export const registerUser = async (login, password, groupNumber) => {
  try {
    const response = await api.post("/auth/register", {
      login: login,
      password: password,
      groupNumber: groupNumber,
    }, {withCredentials: true});

     const data = response.data;
     const accessToken = data.accessToken || data.access_token || data.token

     if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
     }

     return data;
  } catch (e) {
    if (e.response) {
      const status = e.response.status;
      const data = e.response.data;

      if (status === 400) {
        console.log("Заполните все поля корректно");
        throw new Error('Заполните все поля!');
      }

      if (status === 409) {
        console.log("пользователь уже есть с таким паролем и логином ");
        throw new Error('Пользователь с таким логином уже существует!');
      }
    }
    throw new Error(e || '');
  }
};
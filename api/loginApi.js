import { api } from "./../src/App/api";

export const loginUser = async (login, password) => {
  try {
    const response = await api.post(
      "/auth/login",
      {
        login: login,
        password: password,
      },
      { withCredentials: true }
    );

    const data = response.data;
    const accessToken = data.accessToken || data.access_token || data.token;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    return data;
  } catch (error) {
    let errorMessage = "Упсс, ошибка авторизации";

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401) {
        errorMessage = "Ошибка:Неверный логин или пароль";
      } else if (status === 400 || status === 422) {
        if (Array.isArray(data?.message)) {
          errorMessage = data.message.join(", ");
        } else {
          errorMessage = data?.message || data?.detail || "Проверьте введенные данные";
        }
      } else if (status >= 500) {
        errorMessage = "Сервер временно недоступен. Попробуйте позже";
      } else {
        errorMessage = data?.message || errorMessage;
      }
    } else if (error.request) {
      errorMessage = "Не удалось связаться с сервером. Проверьте соединение";
    }

    throw new Error(errorMessage);
  }
};
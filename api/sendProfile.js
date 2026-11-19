import { api } from "../src/App/api";

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/users/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const uploadBanner = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/users/me/banner", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const connectTelegram = async () => {
  const { data } = await api.post("/users/me/telegram/connect");
  return data;
};

export const disconnectTelegram = async () => {
  const { data } = await api.delete("/users/me/telegram/disconnect");
  return data;
};

export const claimEasterEgg = async () => {
  const { data } = await api.post("/me/claim-easter-egg");
  return data;
};

import { api } from "../src/App/api";

export const getTasks = async () => {
  try {
    const responce = await api.get("/tasks");
    return responce.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

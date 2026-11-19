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

export const getTaskById = async (id) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

export const submitTask = async (id, { solutionLink, comment }) => {
  const { data } = await api.post(`/tasks/${id}/submissions`, {
    solutionLink,
    comment: comment || undefined,
  });
  return data;
};

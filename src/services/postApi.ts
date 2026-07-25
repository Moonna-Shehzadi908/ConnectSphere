import api from "./api";

export const createPost = async (
  content: string,
  visibility: string = "PUBLIC"
) => {
  const formData = new FormData();

  formData.append("content", content);
  formData.append("visibility", visibility);

  const response = await api.post("/posts/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
import api from "./api";

export const getCommentsByShoutout = (shoutoutId) =>
  api.get(`/comments/shoutout/${shoutoutId}`);

export const createComment = (data) => api.post("/comments/", data);

export const deleteComment = (id) => api.delete(`/comments/${id}`);

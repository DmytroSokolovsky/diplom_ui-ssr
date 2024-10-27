import { instance } from "./api";

export const recordsAPI = {
  get(recordId) {
    return instance
      .get(`records/${recordId}`)
      .then(response => response.data);
  },
  delete(recordId) {
    return instance
      .delete(`records/${recordId}`)
      .then(response => response.data);
  }
}
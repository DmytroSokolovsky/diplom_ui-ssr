import { instance } from "./api";

export const doctorsAPI = {
  getAll() {
    return instance
      .get(`doctors`)
      .then(response => response.data);
  },
  getOne(telegramId) {
    return instance
      .get(`doctor/${telegramId}`)
      .then(response => response.data);
  }
}
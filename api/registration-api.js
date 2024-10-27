import axios from "axios";
import { instance } from "./api";

const TELEGRAM_BOT_TOKEN = '7528553042:AAH--t6VitbS4Su4pDKKsODm1UWkzqnQdMo';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

export const registrationAPI = {
  addRecord(data) {
    return instance
      .post(`records`, data)
      .then(response => response.data);
  },
  sendMessageToDoctor(chat_id, text) {
    return axios.post(TELEGRAM_API_URL, {
      chat_id, 
      text
    });
  },
  getSpecializations() {
    return instance
      .get(`doctors/specializations/all`)
      .then(response => response.data);
  },
  getDoctors(specialization) {
    return instance
      .get(`doctors/${specialization}`)
      .then(response => response.data);
  },
  getSchedule(doctorId) {
    return instance
      .get(`doctor/${doctorId}/schedule`)
      .then(response => response.data);
  },
}
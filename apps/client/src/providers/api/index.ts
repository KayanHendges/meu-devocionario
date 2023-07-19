import { handleDates } from "@utils/formats/date";
import axios from "axios";
import Router from "next/router";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.response.use((originalResponse) => {
  try {
    if (originalResponse.status === 401) {
      Router.push("/login");
    }

    handleDates(originalResponse.data);
    return originalResponse;
  } catch (error) {
    return originalResponse;
  }
});

export { api };

import { handleDates } from "@utils/formats/date";
import axios from "axios";
import Router from "next/navigation";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((request) => {
  const cookieStore = cookies();
  const token = cookieStore.get("auth.token");

  if (request.headers && token)
    Object.assign(request.headers, { Authorization: `Bearer ${token}` });

  return request;
});

api.interceptors.response.use((originalResponse) => {
  try {
    if (originalResponse.status === 401) {
      Router.redirect("/login");
    }

    handleDates(originalResponse.data);
    return originalResponse;
  } catch (error) {
    return originalResponse;
  }
});

export { api };

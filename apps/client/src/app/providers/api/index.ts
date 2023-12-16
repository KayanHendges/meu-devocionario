import { handleDates } from "@utils/formats/date";
import axios from "axios";
import Router from "next/navigation";
import { getCookie } from "cookies-next";
import { config } from "@config/variables";
import { NextResponse } from "next/server";

const api2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api2.interceptors.request.use((request) => {
  const token = getCookie(config.accessToken);

  if (request.headers && token)
    Object.assign(request.headers, { Authorization: `Bearer ${token}` });

  return request;
});

api2.interceptors.response.use((originalResponse) => {
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

interface ApiConfig extends RequestInit {
  params?: Record<string, string | number | undefined | boolean>;
  method: string;
}

interface RequestConfig extends Omit<ApiConfig, "method"> {}

interface ResponseAPI<T = unknown> extends Record<string, any> {
  data: T;
}

class Api {
  private readonly baseUrl: string;
  private token?: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  }

  async get(path: string, options?: RequestConfig) {
    this.request(path, { ...options, method: "get" });
  }

  private async request<T = unknown>(path: string, options?: ApiConfig) {
    if (!this.token) {
      const token = getCookie(config.accessToken);
      if (token) this.token = token;
    }

    const headers = new Headers(options?.headers);

    if (this.token) headers.set("Authorizathion", `Bearer ${this.token}`);

    const configOptions: RequestInit = options || {};
    const url = new URL(path, this.baseUrl);

    Object.entries(options?.params || {}).forEach(
      ([key, value]) => value && url.searchParams.set(key, value.toString())
    );

    const response = await fetch(url, configOptions);
    return response.json() as unknown as ResponseAPI<T>;
  }
}

const api = new Api();

export { api2 };

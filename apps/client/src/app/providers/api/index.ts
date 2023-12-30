import { handleDates } from "@utils/formats/date";
import axios from "axios";
import Router from "next/navigation";
import { getCookie } from "cookies-next";
import { config } from "@config/variables";

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
  params?: any;
  method: string;
}

interface RequestConfig extends Omit<ApiConfig, "method"> {}

interface ResponseAPI<T = any> extends Response {
  data: T;
}

export interface CacheConfig {
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

export class FetchApiException extends Error {
  constructor(public response: ResponseAPI) {
    super(response.statusText);
  }
}

class Api {
  private readonly baseUrl: string;
  private token?: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  }

  async get<T = any>(path: string, options?: RequestConfig) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  async post<T = any>(
    path: string,
    body: Record<string, any>,
    options?: RequestConfig
  ) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async patch<T = any>(
    path: string,
    body: Record<string, any>,
    options?: RequestConfig
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async delete<T = any>(path: string, options?: RequestConfig) {
    return this.request<T>(path, {
      ...options,
      method: "DELETE",
    });
  }

  private async request<T = unknown>(
    path: string,
    options?: ApiConfig
  ): Promise<ResponseAPI<T>> {
    if (!this.token) {
      const token = getCookie(config.accessToken);
      if (token) this.token = token;
    }

    const headers = new Headers(options?.headers);

    if (this.token) headers.set("Authorization", `Bearer ${this.token}`);
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    const configOptions: RequestInit = options || {};
    const url = new URL(path, this.baseUrl);

    Object.entries(options?.params || {}).forEach(
      ([key, value]) => value && url.searchParams.set(key, value.toString())
    );

    const response = await fetch(url, {
      ...configOptions,
      headers,
    });

    const { status } = response;
    const data = (await response.json().catch(() => {})) || {};

    const apiResponse = { ...response, data };

    if (status >= 400) throw new FetchApiException(apiResponse);

    return apiResponse;
  }
}

const api = new Api();

export { api };

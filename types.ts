export interface FetcherOptions<T> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
  credentials?: "include" | "omit" | "same-origin";
  fetchOptions?: any;
}

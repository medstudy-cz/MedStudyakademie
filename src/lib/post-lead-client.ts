import axios, { type AxiosResponse } from "axios";

const NETWORK_ERROR_CODES = new Set(["ERR_NETWORK", "ECONNABORTED", "ETIMEDOUT"]);

function isRetryableNetworkError(error: unknown): boolean {
  if (!axios.isAxiosError(error)) return false;
  if (error.response) return false;
  return NETWORK_ERROR_CODES.has(error.code ?? "") || error.message === "Network Error";
}

export async function postLeadWithRetry<T = unknown>(
  url: string,
  data: unknown,
  maxAttempts = 2,
): Promise<AxiosResponse<T>> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await axios.post<T>(url, data, {
        timeout: 30_000,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      lastError = error;
      if (attempt >= maxAttempts || !isRetryableNetworkError(error)) throw error;
      await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
  throw lastError;
}

import axios, { AxiosError } from "axios";

import type {
  BenchmarkRequest,
  BenchmarkResponse,
  ComparisonRequest,
  ComparisonResponse,
} from "@/types/benchmark";

import type {
  HistoryResponse,
  ClearHistoryResponse,
  HistorySummary,
} from "@/types/history";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("Server not reachable.");
    } else {
      console.error(error.message);
    }

    return Promise.reject(error);
  }
);

export const BenchmarkAPI = {
  async runBenchmark(
    payload: BenchmarkRequest
  ): Promise<BenchmarkResponse> {
    const { data } = await api.post<BenchmarkResponse>(
      "/benchmark",
      payload
    );

    return data;
  },

  async compareAlgorithms(
    payload: ComparisonRequest
  ): Promise<ComparisonResponse> {
    const { data } = await api.post<ComparisonResponse>(
      "/comparison",
      payload
    );

    return data;
  },

  async getAlgorithms(): Promise<string[]> {
    const { data } = await api.get<string[]>(
      "/algorithms"
    );

    return data;
  },

  async getHistory(
    algorithm?: string,
    datasetType?: string
  ): Promise<HistoryResponse> {
    const { data } =
      await api.get<HistoryResponse>("/history", {
        params: {
          algorithm,
          dataset_type: datasetType,
        },
      });

    return data;
  },

  async getHistoryItem(id: string) {
    const { data } = await api.get(
      `/history/${id}`
    );

    return data;
  },

  async deleteHistoryItem(
    id: string
  ): Promise<{ message: string }> {
    const { data } = await api.delete<{
      message: string;
    }>(`/history/${id}`);

    return data;
  },

  async clearHistory(): Promise<ClearHistoryResponse> {
    const { data } =
      await api.delete<ClearHistoryResponse>(
        "/history"
      );

    return data;
  },

  async getHistorySummary(): Promise<HistorySummary> {
    const { data } =
      await api.get<HistorySummary>(
        "/history/stats/summary"
      );

    return data;
  },

  async getAlgorithmUsage(): Promise<
    Record<string, number>
  > {
    const { data } =
      await api.get<Record<string, number>>(
        "/history/algorithms/usage"
      );

    return data;
  },

  async exportHistory(
    format: "csv" | "json" | "pdf"
  ): Promise<Blob> {
    const response = await api.get(
      `/export/${format}`,
      {
        responseType: "blob",
      }
    );

    return response.data;
  },
};

export default api;
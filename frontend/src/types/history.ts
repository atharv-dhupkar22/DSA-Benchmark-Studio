export interface HistoryItem {
  id?: string;

  algorithm: string;

  category: string;

  dataset_type: string;

  dataset_size: number;

  runs: number;

  execution: {
    average_ms: number;
    median_ms: number;
    minimum_ms: number;
    maximum_ms: number;
    standard_deviation_ms: number;
  };

  peak_memory_kb: number;

  algorithm_metrics: Record<string, any>;

  metadata: Record<string, any>;
}

export interface HistoryResponse {
  total: number;
  history: HistoryItem[];
}

export interface HistorySummary {
  total_runs: number;
  fastest_algorithm: string | null;
  average_execution_ms: number;
}

export interface ClearHistoryResponse {
  message: string;
}
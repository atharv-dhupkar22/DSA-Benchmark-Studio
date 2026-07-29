export type DatasetType =
  | "random"
  | "sorted"
  | "reverse_sorted"
  | "nearly_sorted"
  | "few_unique"
  | "custom";

export interface BenchmarkRequest {
  algorithm: string;
  dataset_type: DatasetType;
  dataset_size: number;
  runs: number;

  random_min: number;
  random_max: number;

  custom_dataset?: number[];
}

export interface BenchmarkSummary {
  average_ms: number;
  median_ms: number;
  minimum_ms: number;
  maximum_ms: number;
  standard_deviation_ms: number;
}

export interface BenchmarkResponse {
  algorithm: string;

  category: string;

  dataset_type: DatasetType;

  dataset_size: number;

  runs: number;

  execution: BenchmarkSummary;

  peak_memory_kb: number;

  algorithm_metrics: Record<string, any>;

  metadata: Record<string, any>;
}

export const DATASET_TYPES: DatasetType[] = [
  "random",
  "sorted",
  "reverse_sorted",
  "nearly_sorted",
  "few_unique",
  "custom",
];

export const ALGORITHMS = [
  "bubble_sort",
  "selection_sort",
  "insertion_sort",
  "merge_sort",
  "quick_sort",
  "heap_sort",
  "shell_sort",
  "counting_sort",
  "radix_sort",
];
export interface ComparisonRequest {
  algorithms: string[];
  dataset_type: DatasetType;
  dataset_size: number;
  runs: number;
  random_min: number;
  random_max: number;
  custom_dataset?: number[] | null;
}

export interface ComparisonEntry {
  algorithm: string;
  category: string;
  average_execution_time_ms: number;
  peak_memory_kb: number;
  comparisons: number;
  swaps: number;
  operations: number;
  recursion_depth: number;
  metadata: Record<string, any>;
}

export interface ComparisonSummary {
  fastest_algorithm: string;
  slowest_algorithm: string;
  least_memory_algorithm: string;
  total_algorithms: number;
  dataset_size: number;
  benchmark_runs: number;
}

export interface ComparisonResponse {
  ranking: ComparisonEntry[];
  summary: ComparisonSummary;
}
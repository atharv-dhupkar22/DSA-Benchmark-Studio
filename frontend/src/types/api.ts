export type DatasetType =
  | "random"
  | "sorted"
  | "reverse_sorted"
  | "nearly_sorted"
  | "few_unique"
  | "custom";

export interface AlgorithmComplexity {
  best: string;
  average: string;
  worst: string;
  space: string;
}

export interface AlgorithmProperties {
  stable: boolean;
  in_place: boolean;
  recursive: boolean;
}

export interface AlgorithmMetadata {
  name: string;
  category: string;
  complexity: AlgorithmComplexity;
  properties: AlgorithmProperties;
}

export interface AlgorithmResult {
  algorithm: string;
  category: string;
  output: number[];
  comparisons: number;
  swaps: number;
  operations: number;
  recursion_depth: number;
  metadata: Record<string, unknown>;
}

export interface BenchmarkStatistics {
  average: number;
  median: number;
  minimum: number;
  maximum: number;
  standard_deviation: number;
}

export interface BenchmarkMetadata {
  statistics: BenchmarkStatistics;
  dataset_size: number;
  benchmark_runs: number;
  complexity: AlgorithmComplexity;
  properties: AlgorithmProperties;
}

export interface BenchmarkResponse {
  algorithm: string;
  category: string;
  execution_time_ms: number;
  peak_memory_kb: number;
  cpu_usage_percent: number;
  runs: number;
  success: boolean;
  error?: string | null;
  algorithm_result: AlgorithmResult;
  metadata: BenchmarkMetadata;
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
  metadata: Record<string, unknown>;
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

export interface BenchmarkRequest {
  algorithm: string;
  dataset_type: DatasetType;
  dataset_size: number;
  runs: number;
  random_min: number;
  random_max: number;
  custom_dataset?: number[];
}

export interface ComparisonRequest {
  algorithms: string[];
  dataset_type: DatasetType;
  dataset_size: number;
  runs: number;
  random_min: number;
  random_max: number;
  custom_dataset?: number[];
}

export interface AlgorithmInfo {
  name: string;
  category: string;
}

export interface AlgorithmsResponse {
  count: number;
  algorithms: AlgorithmInfo[];
}

export interface LeaderboardItem {
  rank: number;
  algorithm: string;
  execution_time_ms: number;
  peak_memory_kb: number;
  operations: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface RuntimeChartData {
  algorithm: string;
  runtime: number;
}

export interface MemoryChartData {
  algorithm: string;
  memory: number;
}

export interface OperationsChartData {
  algorithm: string;
  operations: number;
}
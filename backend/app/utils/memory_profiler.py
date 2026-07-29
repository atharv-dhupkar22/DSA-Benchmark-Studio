from __future__ import annotations

import tracemalloc


class MemoryProfiler:
    """
    Measures peak memory allocated by an algorithm.

    Uses Python's tracemalloc module to capture
    memory allocations during benchmark execution.
    """

    def __init__(self) -> None:
        self._running = False

    def start(self) -> None:
        """
        Start memory tracking.
        """
        if self._running:
            return

        tracemalloc.start()
        self._running = True

    def stop(self) -> float:
        """
        Stop memory tracking.

        Returns
        -------
        float
            Peak memory usage in KB.
        """
        if not self._running:
            raise RuntimeError("Memory profiler has not been started.")

        _, peak = tracemalloc.get_traced_memory()

        tracemalloc.stop()
        self._running = False

        return peak / 1024

    def reset(self) -> None:
        """
        Reset the profiler.
        """
        if self._running:
            tracemalloc.stop()

        self._running = False

    @property
    def running(self) -> bool:
        """
        Indicates whether the profiler is active.
        """
        return self._running

    def __enter__(self) -> "MemoryProfiler":
        self.start()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        self.stop()
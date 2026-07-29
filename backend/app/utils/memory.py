from __future__ import annotations

import tracemalloc


class MemoryProfiler:
    """
    Memory profiler used by the Benchmark Engine.

    Measures peak memory allocated during
    an algorithm execution using tracemalloc.
    """

    def __init__(self) -> None:
        self._started = False

    def start(self) -> None:
        """
        Start memory tracking.
        """

        if tracemalloc.is_tracing():
            tracemalloc.stop()

        tracemalloc.start()

        self._started = True

    def stop(self) -> float:
        """
        Stop memory tracking.

        Returns
        -------
        float
            Peak memory usage in KB.
        """

        if not self._started:
            raise RuntimeError(
                "Memory profiler has not been started."
            )

        current, peak = tracemalloc.get_traced_memory()

        tracemalloc.stop()

        self._started = False

        return round(peak / 1024, 3)

    def reset(self) -> None:
        """
        Reset memory profiler.
        """

        if tracemalloc.is_tracing():
            tracemalloc.stop()

        self._started = False
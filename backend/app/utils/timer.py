from __future__ import annotations

import time


class HighPrecisionTimer:
    """
    High-resolution timer for benchmarking algorithms.

    Uses time.perf_counter_ns() to provide nanosecond precision.

    The timer can be started and stopped multiple times,
    making it suitable for repeated benchmark runs.
    """

    def __init__(self) -> None:
        self._start_ns: int | None = None
        self._end_ns: int | None = None

    def start(self) -> None:
        """
        Start the timer.
        """
        self._start_ns = time.perf_counter_ns()
        self._end_ns = None

    def stop(self) -> None:
        """
        Stop the timer.
        """
        if self._start_ns is None:
            raise RuntimeError("Timer has not been started.")

        self._end_ns = time.perf_counter_ns()

    def reset(self) -> None:
        """
        Reset the timer.
        """
        self._start_ns = None
        self._end_ns = None

    @property
    def elapsed_ns(self) -> int:
        """
        Return elapsed time in nanoseconds.
        """
        if self._start_ns is None or self._end_ns is None:
            raise RuntimeError("Timer has not been completed.")

        return self._end_ns - self._start_ns

    @property
    def elapsed_us(self) -> float:
        """
        Return elapsed time in microseconds.
        """
        return self.elapsed_ns / 1_000

    @property
    def elapsed_ms(self) -> float:
        """
        Return elapsed time in milliseconds.
        """
        return self.elapsed_ns / 1_000_000

    @property
    def elapsed_seconds(self) -> float:
        """
        Return elapsed time in seconds.
        """
        return self.elapsed_ns / 1_000_000_000

    def __enter__(self) -> "HighPrecisionTimer":
        self.start()
        return self

    def __exit__(self, exc_type, exc_value, traceback) -> None:
        self.stop()
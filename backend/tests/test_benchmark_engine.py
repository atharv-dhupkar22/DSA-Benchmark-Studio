from __future__ import annotations

from app.algorithms.sorting import BubbleSort
from app.benchmark import BenchmarkEngine


def test_bubble_sort_benchmark():
    """
    Verify that the benchmark engine executes Bubble Sort correctly.
    """

    engine = BenchmarkEngine()

    algorithm = BubbleSort()

    dataset = [5, 3, 8, 1, 2, 9, 4]

    result = engine.run(
        algorithm=algorithm,
        dataset=dataset,
        runs=5,
    )

    assert result.success is True

    assert result.algorithm == "Bubble Sort"

    assert result.category == "Sorting"

    assert result.runs == 5

    assert result.algorithm_result.output == sorted(dataset)

    assert result.execution_time_ms >= 0

    assert result.peak_memory_kb >= 0


def test_original_dataset_is_not_modified():
    """
    Ensure the benchmark engine never mutates the original dataset.
    """

    engine = BenchmarkEngine()

    algorithm = BubbleSort()

    dataset = [7, 6, 5, 4, 3, 2, 1]

    original = dataset.copy()

    engine.run(
        algorithm=algorithm,
        dataset=dataset,
        runs=3,
    )

    assert dataset == original


def test_invalid_runs():
    """
    Benchmark must reject invalid run counts.
    """

    engine = BenchmarkEngine()

    algorithm = BubbleSort()

    try:
        engine.run(
            algorithm=algorithm,
            dataset=[1, 2, 3],
            runs=0,
        )

        assert False

    except ValueError:
        assert True


def test_sorted_output():
    """
    Verify sorted output.
    """

    engine = BenchmarkEngine()

    algorithm = BubbleSort()

    dataset = [9, 1, 8, 3, 5]

    result = engine.run(
        algorithm=algorithm,
        dataset=dataset,
        runs=1,
    )

    assert result.algorithm_result.output == [
        1,
        3,
        5,
        8,
        9,
    ]


def test_algorithm_metrics():
    """
    Bubble Sort should collect algorithm metrics.
    """

    engine = BenchmarkEngine()

    algorithm = BubbleSort()

    result = engine.run(
        algorithm=algorithm,
        dataset=[4, 3, 2, 1],
        runs=1,
    )

    metrics = result.algorithm_result

    assert metrics.comparisons > 0

    assert metrics.operations > 0

    assert metrics.swaps > 0


def test_statistics_metadata():
    """
    Benchmark statistics should be attached to metadata.
    """

    engine = BenchmarkEngine()

    algorithm = BubbleSort()

    result = engine.run(
        algorithm=algorithm,
        dataset=[9, 8, 7, 6, 5],
        runs=10,
    )

    assert "statistics" in result.metadata

    stats = result.metadata["statistics"]

    assert "average" in stats

    assert "median" in stats

    assert "minimum" in stats

    assert "maximum" in stats

    assert "standard_deviation" in stats


def test_complexity_metadata():
    """
    Complexity metadata should be available.
    """

    engine = BenchmarkEngine()

    algorithm = BubbleSort()

    result = engine.run(
        algorithm=algorithm,
        dataset=[3, 2, 1],
        runs=1,
    )

    complexity = result.metadata["complexity"]

    assert complexity["best"] == "O(n)"

    assert complexity["average"] == "O(n²)"

    assert complexity["worst"] == "O(n²)"

    assert complexity["space"] == "O(1)"


def test_algorithm_properties():
    """
    Algorithm properties should be exposed.
    """

    engine = BenchmarkEngine()

    algorithm = BubbleSort()

    result = engine.run(
        algorithm=algorithm,
        dataset=[5, 1, 4],
        runs=1,
    )

    props = result.metadata["properties"]

    assert props["stable"] is True

    assert props["in_place"] is True

    assert props["recursive"] is False
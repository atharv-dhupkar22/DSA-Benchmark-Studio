from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


class PDFExporter:
    """
    Export benchmark history as a professional PDF report.
    """

    def export(
        self,
        output_path: Path,
        data: list[dict[str, Any]],
    ) -> Path:

        document = SimpleDocTemplate(
            str(output_path),
            rightMargin=0.5 * inch,
            leftMargin=0.5 * inch,
            topMargin=0.5 * inch,
            bottomMargin=0.5 * inch,
        )

        styles = getSampleStyleSheet()

        title_style = styles["Title"]
        title_style.alignment = TA_CENTER

        heading_style = styles["Heading2"]

        normal_style = styles["BodyText"]

        elements = []

        # --------------------------------------------------
        # Title
        # --------------------------------------------------

        elements.append(
            Paragraph(
                "DSA Benchmark Studio",
                title_style,
            )
        )

        elements.append(
            Paragraph(
                "Benchmark Export Report",
                heading_style,
            )
        )

        elements.append(Spacer(1, 0.25 * inch))

        # --------------------------------------------------
        # Summary
        # --------------------------------------------------

        elements.append(
            Paragraph(
                f"<b>Generated:</b> {datetime.now().strftime('%d %B %Y %H:%M:%S')}",
                normal_style,
            )
        )

        elements.append(
            Paragraph(
                f"<b>Total Benchmarks:</b> {len(data)}",
                normal_style,
            )
        )

        elements.append(Spacer(1, 0.25 * inch))

        # --------------------------------------------------
        # Table
        # --------------------------------------------------

        table_data = [
            [
                "Algorithm",
                "Category",
                "Dataset",
                "Size",
                "Average (ms)",
                "Peak Memory",
                "Time Complexity",
            ]
        ]

        for item in data:

            execution = item.get("execution", {})
            metrics = item.get("algorithm_metrics", {})

            table_data.append(
                [
                    item.get("algorithm", ""),
                    item.get("category", ""),
                    item.get("dataset_type", ""),
                    str(item.get("dataset_size", "")),
                    f"{execution.get('average_ms', 0):.4f}",
                    str(item.get("peak_memory_kb", "")),
                    metrics.get("time_complexity", ""),
                ]
            )

        table = Table(
            table_data,
            repeatRows=1,
        )

        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F4E78")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
                    ("TOPPADDING", (0, 0), (-1, 0), 8),
                    ("BOTTOMPADDING", (0, 1), (-1, -1), 6),
                    ("TOPPADDING", (0, 1), (-1, -1), 6),
                ]
            )
        )

        elements.append(table)

        elements.append(Spacer(1, 0.3 * inch))

        # --------------------------------------------------
        # Detailed Results
        # --------------------------------------------------

        elements.append(
            Paragraph(
                "Detailed Benchmark Results",
                heading_style,
            )
        )

        elements.append(Spacer(1, 0.15 * inch))

        for benchmark in data:

            execution = benchmark.get("execution", {})
            metrics = benchmark.get("algorithm_metrics", {})

            elements.append(
                Paragraph(
                    f"<b>{benchmark.get('algorithm')}</b>",
                    styles["Heading3"],
                )
            )

            elements.append(
                Paragraph(
                    f"""
                    Category: {benchmark.get('category')}<br/>
                    Dataset Type: {benchmark.get('dataset_type')}<br/>
                    Dataset Size: {benchmark.get('dataset_size')}<br/>
                    Runs: {benchmark.get('runs')}<br/>
                    Average Time: {execution.get('average_ms')} ms<br/>
                    Median Time: {execution.get('median_ms')} ms<br/>
                    Minimum Time: {execution.get('minimum_ms')} ms<br/>
                    Maximum Time: {execution.get('maximum_ms')} ms<br/>
                    Std Deviation: {execution.get('standard_deviation_ms')} ms<br/>
                    Peak Memory: {benchmark.get('peak_memory_kb')} KB<br/>
                    Time Complexity: {metrics.get('time_complexity')}<br/>
                    Space Complexity: {metrics.get('space_complexity')}<br/>
                    Stable: {metrics.get('stable')}<br/>
                    In Place: {metrics.get('in_place')}
                    """,
                    normal_style,
                )
            )

            elements.append(Spacer(1, 0.18 * inch))

        document.build(elements)

        return output_path
from __future__ import annotations

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Global application settings.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )

    APP_NAME: str = "DSA Benchmark Studio"

    APP_VERSION: str = "1.0.0"

    DEBUG: bool = True

    DEFAULT_BENCHMARK_RUNS: int = Field(
        default=10,
        ge=1,
        le=100,
    )

    DEFAULT_DATASET_SIZE: int = Field(
        default=1000,
        ge=1,
    )

    RANDOM_MIN: int = 0

    RANDOM_MAX: int = 100000

    CORS_ORIGINS: list[str] = [
        "*",
    ]


@lru_cache
def get_settings() -> Settings:
    """
    Returns cached application settings.
    """
    return Settings()


settings = get_settings()
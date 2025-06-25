import contextlib
import logging.config
import libsql


from fastapi import Depends
from pydantic_settings import BaseSettings


class Settings(BaseSettings, env_file=".env.local", extra="ignore"):
    turso_database_url: str
    turso_auth_token: str
    local_database: str
    logging_config: str


settings = Settings()


def get_logger():
    return logging.getLogger(__name__)


def get_db(logger: logging.Logger = Depends(get_logger)):
    with contextlib.closing(
        libsql.connect(
            settings.local_database,
            url=settings.turso_database_url,
            auth_token=settings.turso_auth_token,
        )
    ) as db:
        db.set_trace_callback(logger.debug)
        yield db

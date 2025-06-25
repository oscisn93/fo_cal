from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str
    admin_email: str
    convex_url: str
    convex_deployment: str
    # tells fastapi where to find the above settings
    model_config = SettingsConfigDict(env_file=".env.local")

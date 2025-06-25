from functools import lru_cache


from fastapi import Depends, FastAPI
from typing_extensions import Annotated
from .config import Settings


app = FastAPI()


@lru_cache
def get_settings():
    return Settings()


@app.get("/info")
async def info(settings: Annotated[Settings, Depends(get_settings)]):
    return {
        "app_name": settings.app_name,
        "admin_email": settings.admin_email,
        "convex_deployment": settings.convex_deployment
    }


# tasks = {
#     "1": {"title": "Task A", "description": "Some task that needs to get done.", "completed": False },
#     "2": {"title": "Task B", "description": "Some other task that also needs to get done.", "completed": False }
# }


# @app.get("/tasks/{task_id}")
# async def read_task(task_id: str):
#     if task_id not in tasks:
#         raise Exception("Invalid Key")
#     return {"task": tasks[task_id]}

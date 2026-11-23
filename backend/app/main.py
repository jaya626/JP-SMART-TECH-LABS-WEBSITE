
from fastapi import FastAPI

from app.config import settings
from app.api.v1.router import router as api_v1_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Backend API for JP Smart Tech Labs"
)


@app.get("/", tags=["Root"])
def home():
    return {
        "message": "Welcome to JP Smart Tech Labs!",
        "status": "Backend is running successfully"
    }


app.include_router(
    api_v1_router,
    prefix=settings.API_V1_PREFIX
)

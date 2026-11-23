
from fastapi import APIRouter

router = APIRouter()


@router.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "message": "JP Smart Tech Labs API is running"
    }

from fastapi import APIRouter, Request, HTTPException

router = APIRouter()

@router.post("/pms/{pmscode}")
async def receive_pms_message(pmscode: str, request: Request):
    # Stub: just echo the PMS code and request body length
    body = await request.body()
    return {
        "pmscode": pmscode,
        "received_bytes": len(body),
        "message": "Stub endpoint. Translation logic to be implemented."
    }

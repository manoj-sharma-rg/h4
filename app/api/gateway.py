from fastapi import APIRouter, Request, HTTPException
import logging
from app.plugins.manager import PluginManager

router = APIRouter()
logger = logging.getLogger("gateway_api")

@router.post("/pms/{pmscode}")
async def receive_pms_message(pmscode: str, request: Request):
    body = await request.body()
    try:
        plugin = PluginManager.load_plugin(pmscode)
    except ImportError as e:
        logger.error(f"Plugin load failed for PMS '{pmscode}': {e}")
        raise HTTPException(status_code=404, detail=f"PMS plugin '{pmscode}' not found")

    if not plugin.validate(body):
        logger.warning(f"Validation failed for PMS '{pmscode}'")
        raise HTTPException(status_code=422, detail="Payload validation failed")

    result = plugin.translate(body)
    logger.info(f"Translation successful for PMS '{pmscode}'")
    return {
        "pmscode": pmscode,
        "result": result,
        "message": "Translation completed."
    }

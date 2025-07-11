from fastapi import APIRouter, Request, HTTPException
import logging
from app.plugins.manager import PluginManager
from app.outbound.sender import send_rgbridge_message
from app.mapping.manager import MappingManager

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

    # Convert result to XML (stub for now)
    xml_payload = f'<RGBridge><PMSCode>{pmscode}</PMSCode>'
    for k, v in result.items():
        xml_payload += f'<{k}>{v}</{k}>'
    xml_payload += '</RGBridge>'
    logger.info(f"Generated XML payload: {xml_payload}")

    # Send to outbound delivery
    try:
        status_code, response_text = send_rgbridge_message(xml_payload)
        logger.info(f"Outbound delivery status: {status_code}")
    except Exception as e:
        logger.error(f"Outbound delivery failed: {e}")
        raise HTTPException(status_code=502, detail="Failed to deliver RGBridge message")

    return {
        "pmscode": pmscode,
        "result": result,
        "outbound_status": status_code,
        "outbound_response": response_text,
        "message": "Translation and delivery completed."
    }

@router.get("/mapping/{pmscode}")
async def get_mapping(pmscode: str):
    try:
        mapping = MappingManager.load_mapping(pmscode)
        return mapping
    except FileNotFoundError:
        logger.error(f"Mapping not found for PMS '{pmscode}'")
        raise HTTPException(status_code=404, detail=f"Mapping for PMS '{pmscode}' not found")
    except Exception as e:
        logger.error(f"Error loading mapping for PMS '{pmscode}': {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

import httpx
import logging
from tenacity import retry, stop_after_attempt, wait_exponential
from typing import Tuple

logger = logging.getLogger("outbound_sender")

# Configuration (could be loaded from env or config file)
RGBRIDGE_API_URL = "https://internal-api.example.com/rgbridge"
RGBRIDGE_API_USER = "user"
RGBRIDGE_API_PASS = "pass"

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2))
def send_rgbridge_message(xml_payload: str, endpoint_url: str = RGBRIDGE_API_URL, auth: Tuple[str, str] = (RGBRIDGE_API_USER, RGBRIDGE_API_PASS)) -> Tuple[int, str]:
    headers = {"Content-Type": "application/xml"}
    logger.info(f"Sending RGBridge message to {endpoint_url}")
    try:
        response = httpx.post(endpoint_url, data=xml_payload, headers=headers, auth=auth, timeout=10)
        response.raise_for_status()
        logger.info(f"Successfully delivered message, status {response.status_code}")
        return response.status_code, response.text
    except Exception as e:
        logger.error(f"Failed to deliver RGBridge message: {e}")
        raise


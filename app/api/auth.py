import os
from fastapi import Header, HTTPException, status, Depends

API_KEY = os.getenv("API_KEY", "changeme")
API_KEY_NAME = "x-api-key"

def api_key_auth(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key",
        )
    return x_api_key 
from fastapi import FastAPI
from app.api import gateway
from app.api import health
from app.utils.logging import init_logging

init_logging()

app = FastAPI(title="PMS-to-RGBridge Integration Platform")

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Include PMS API router (stub for now)
app.include_router(gateway.router)
app.include_router(health.router)

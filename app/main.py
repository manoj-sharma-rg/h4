from fastapi import FastAPI
from app.api import gateway

app = FastAPI(title="PMS-to-RGBridge Integration Platform")

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Include PMS API router (stub for now)
app.include_router(gateway.router)

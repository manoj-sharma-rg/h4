from fastapi import APIRouter, Response
import os

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.get("/metrics")
def metrics():
    # Placeholder for Prometheus metrics
    return {"metrics": "prometheus_metrics_placeholder"}

@router.get("/logs")
def get_logs():
    log_path = os.path.join(os.path.dirname(__file__), '../../app.log')
    if not os.path.exists(log_path):
        return Response("No logs available.", media_type="text/plain")
    with open(log_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()[-100:]
    return Response(''.join(lines), media_type="text/plain") 
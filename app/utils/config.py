import os

def get_config():
    return {
        "API_KEY": os.getenv("API_KEY", "changeme"),
        "RGBRIDGE_API_URL": os.getenv("RGBRIDGE_API_URL", "https://internal-api.example.com/rgbridge"),
        "RGBRIDGE_API_USER": os.getenv("RGBRIDGE_API_USER", "user"),
        "RGBRIDGE_API_PASS": os.getenv("RGBRIDGE_API_PASS", "pass"),
    } 
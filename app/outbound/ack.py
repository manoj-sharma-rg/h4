def parse_ack(response_text: str):
    # Stub: parse XML or text response from RGBridge API
    # In real implementation, parse XML and extract status/result
    if "success" in response_text.lower():
        return {"status": "success"}
    return {"status": "unknown", "raw": response_text} 
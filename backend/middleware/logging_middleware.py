import time
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("aegivex.security")

class SecurityLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        client_ip = request.client.host if request.client else "127.0.0.1"
        
        response: Response = await call_next(request)
        
        process_time = (time.time() - start_time) * 1000
        logger.info(
            f"[{request.method}] {request.url.path} - Status: {response.status_code} - Client IP: {client_ip} - Time: {process_time:.2f}ms"
        )
        
        # Security Headers
        response.headers["X-Content-Type-Options"] = "nosniff text/html"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["X-Powered-By"] = "Aegivex-AI-Security-Engine"
        
        return response

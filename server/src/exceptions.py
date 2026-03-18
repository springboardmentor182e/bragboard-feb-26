from fastapi import Request
from fastapi.responses import JSONResponse


async def http_exception_handler(request: Request, exc):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


async def validation_exception_handler(request: Request, exc):
    return JSONResponse(status_code=422, content={"detail": str(exc)})
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import logging
from contextlib import asynccontextmanager

from app.database.database import engine, Base
from app.api.routes import router as api_router
from app.monitor.monitor import monitor_service

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")

# Create database tables
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Start the background monitor loop
    task = asyncio.create_task(monitor_service.monitor_loop())
    yield
    # Shutdown: Cancel the task
    task.cancel()
    
app = FastAPI(title="YT Views Analyzer API", lifespan=lifespan)

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since it's local we can allow all, or specific react port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

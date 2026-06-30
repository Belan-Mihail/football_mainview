from fastapi import FastAPI
from .database import Base, engine
from .models import models
from app.routers.championship_router import router as championships_router
from fastapi.middleware.cors import CORSMiddleware
from .admin import setup_admin

app = FastAPI()

setup_admin(app)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Football API is running"}

app.include_router(championships_router)
from dotenv import load_dotenv
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.startup import lifespan
from routers import search
load_dotenv()  # Load environment variables from .env file

app = FastAPI(
    title="FridgeSense API",
    description="AI-powered recipe search based on your fridge inventory",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router)

@app.get("/")
def root():
    return {"message": "FridgeSense API is running 🍳"}
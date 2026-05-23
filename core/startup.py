import pandas as pd
import voyageai
from langchain_community.vectorstores import FAISS
from contextlib import asynccontextmanager
from fastapi import FastAPI

_df = None
_vo = None
_vector_store = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global _df, _vo, _vector_store
    
    print("Loading FridgeSense data...")
    
    _df = pd.read_csv("data/final_recipes_data_clean.csv")
    _df.set_index("id", inplace=True)
    
    _vo = voyageai.Client()
    
    _vector_store = FAISS.load_local(
        "faiss_index", 
        None, 
        allow_dangerous_deserialization=True
    )
    
    print("✅ FridgeSense ready!")
    yield
    print("Shutting down...")

def get_df(): return _df
def get_vo(): return _vo
def get_vector_store(): return _vector_store
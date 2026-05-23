from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pandas as pd
import ast
from langchain_community.vectorstores import FAISS
import voyageai
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Load everything once on startup
df = pd.read_csv("final_recipes_data_clean.csv")
df.set_index("id", inplace=True)
vo = voyageai.Client()
vector_store = FAISS.load_local("faiss_index", None, allow_dangerous_deserialization=True)

# --- Models ---
class SearchRequest(BaseModel):
    query: str
    inventory: List[str]

# --- Helper ---
def get_ingredients(recipe):
    try:
        return ast.literal_eval(recipe["ingredients_cleaned"])
    except:
        return []

# --- Routes ---
@app.get("/")
def root():
    return {"message": "FridgeSense API is running"}

@app.post("/search")
def search(req: SearchRequest):
    query_vec = vo.embed([req.query], model="voyage-3.5").embeddings
    results = vector_store.similarity_search_by_vector(query_vec[0], k=10)
    
    scored = []
    for r in results:
        rid = int(r.metadata["recipe_id"])
        if rid not in df.index:
            continue
        recipe = df.loc[rid]
        ingredients = get_ingredients(recipe)
        if isinstance(ingredients, list) and len(ingredients) > 0:
            available = [i for i in ingredients if any(x.lower() in i.lower() for x in req.inventory)]
            coverage = len(available) / len(ingredients)
        else:
            coverage = 0
        scored.append({
            "id": rid,
            "name": recipe["name"],
            "servings": recipe.get("servings", "N/A"),
            "coverage": round(coverage, 2),
            "ingredients": ingredients
        })
    
    scored.sort(key=lambda x: x["coverage"], reverse=True)
    return {"results": scored}
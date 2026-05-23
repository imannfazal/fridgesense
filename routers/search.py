from fastapi import APIRouter
from models.schemas import (
    SearchRequest, 
    PersonalizedSearchRequest,
    SearchResponse,
    PersonalizedSearchResponse
)
from services.search import search_recipes, search_recipes_personalized
from core.startup import get_df, get_vo, get_vector_store

router = APIRouter(prefix="/search", tags=["Search"])

@router.post("/", response_model=SearchResponse)
def search(req: SearchRequest):
    results = search_recipes(
        query=req.query,
        inventory=req.inventory,
        df=get_df(),
        vo=get_vo(),
        vector_store=get_vector_store()
    )
    return SearchResponse(results=results)

@router.post("/personalized", response_model=PersonalizedSearchResponse)
def personalized_search(req: PersonalizedSearchRequest):
    results = search_recipes_personalized(
        query=req.query,
        inventory=req.inventory,
        profile=req.profile,
        df=get_df(),
        vo=get_vo(),
        vector_store=get_vector_store()
    )
    return PersonalizedSearchResponse(results=results)
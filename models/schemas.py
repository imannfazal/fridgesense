from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: str
    inventory: List[str]

class UserProfile(BaseModel):
    diet: Optional[str] = ""
    allergies: List[str] = []
    preferences: List[str] = []

class PersonalizedSearchRequest(BaseModel):
    query: str
    inventory: List[str]
    profile: UserProfile

class RecipeResult(BaseModel):
    id: int
    name: str
    servings: object
    coverage: float
    ingredients: List[str]

class PersonalizedRecipeResult(RecipeResult):
    boost: float
    score: float

class SearchResponse(BaseModel):
    results: List[RecipeResult]

class PersonalizedSearchResponse(BaseModel):
    results: List[PersonalizedRecipeResult]
import ast
from typing import List
from models.schemas import RecipeResult, PersonalizedRecipeResult

PREFERENCE_KEYWORDS = {
    "spicy": ["spicy", "chili", "pepper", "jalapeno", "hot sauce"],
    "quick": ["quick", "easy", "fast", "weeknight", "30-minute"],
    "healthy": ["healthy", "low-fat", "light", "diet"],
    "comfort": ["comfort", "hearty", "classic", "homestyle"],
}

MEAT_KEYWORDS = ["chicken", "beef", "fish", "pork", "lamb"]


def get_ingredients(recipe) -> List[str]:
    try:
        return ast.literal_eval(recipe["ingredients_cleaned"])
    except:
        return []


def compute_coverage(ingredients: List[str], inventory: List[str]) -> float:
    if not ingredients:
        return 0.0
    available = [i for i in ingredients if any(x.lower() in i.lower() for x in inventory)]
    return len(available) / len(ingredients)


def compute_boost(recipe, preferences: List[str]) -> float:
    boost = 0.0
    fields = [str(recipe.get(f, "")).lower() for f in ["name", "ingredients", "tags_merged"]]
    for pref in preferences:
        for kw in PREFERENCE_KEYWORDS.get(pref, [pref]):
            if any(kw in f for f in fields):
                boost += 0.1
                break
    return boost


def search_recipes(query, inventory, df, vo, vector_store, k=10) -> List[RecipeResult]:
    query_vec = vo.embed([query], model="voyage-3.5").embeddings
    results = vector_store.similarity_search_by_vector(query_vec[0], k=k)

    scored = []
    for r in results:
        rid = int(r.metadata["recipe_id"])
        if rid not in df.index:
            continue
        recipe = df.loc[rid]
        ingredients = get_ingredients(recipe)
        coverage = compute_coverage(ingredients, inventory)
        scored.append(RecipeResult(
            id=rid,
            name=recipe["name"],
            servings=recipe.get("servings", "N/A"),
            coverage=round(coverage, 2),
            ingredients=ingredients
        ))

    scored.sort(key=lambda x: x.coverage, reverse=True)
    return scored


def search_recipes_personalized(query, inventory, profile, df, vo, vector_store, k=10) -> List[PersonalizedRecipeResult]:
    query_vec = vo.embed([query], model="voyage-3.5").embeddings
    results = vector_store.similarity_search_by_vector(query_vec[0], k=k)

    scored = []
    for r in results:
        rid = int(r.metadata["recipe_id"])
        if rid not in df.index:
            continue
        recipe = df.loc[rid]
        ingredients = get_ingredients(recipe)

        # allergy filter
        if any(a.lower() in str(ingredients).lower() for a in profile.allergies):
            continue

        # diet filter
        if profile.diet == "vegetarian":
            if any(m in str(ingredients).lower() for m in MEAT_KEYWORDS):
                continue

        coverage = compute_coverage(ingredients, inventory)
        boost = compute_boost(recipe, profile.preferences)
        score = coverage + boost

        scored.append(PersonalizedRecipeResult(
            id=rid,
            name=recipe["name"],
            servings=recipe.get("servings", "N/A"),
            coverage=round(coverage, 2),
            ingredients=ingredients,
            boost=round(boost, 2),
            score=round(score, 2)
        ))

    scored.sort(key=lambda x: x.score, reverse=True)
    return scored
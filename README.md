# FridgeSense

Smart AI-powered fridge assistant that helps you track what’s inside your fridge, understand your eating habits, and suggest healthy, personalized recipes.

## System Overview

```mermaid
flowchart LR
    A[User Voice/Text Query] --> B[Speech-to-Text / Text Input]
    B --> C[LLM Processing + Context Embedding]
    C --> D[Semantic Search on Recipe & Fridge DB]
    D --> E[Recipe Selection Based on Health + History + Inventory]
    E --> F[Text Output + Text-to-Speech]
    F --> G[User Voice/Text Response]
```
## Features

📦 Inventory tracking – Knows what items are in your fridge.

🎙 Voice & text input – Ask by talking or typing.

🍲 Personalized recipes – Suggests meals based on what you have, your past meals, and health conditions.

🔍 Semantic search – Finds the best recipe matches using AI embeddings.

🗣 Voice & text output – Get responses in speech or written form.


## Tech Stack

1. Python (main programming language)

2. Transformers / LLM (for understanding your queries)

3. Speech-to-Text & Text-to-Speech (for voice input/output)

4. Semantic Search

5. Database (for storing inventory and meal history)


## How It Works

1. Detect fridge contents (manually added or via image recognition).


2. Understand your query (e.g., “I want something high protein and low carb”).


3. Search recipe database using embeddings.


4. Reply with voice & text including recipe and steps.

## Research and Innovation

FridgeSense is designed as more than a traditional recipe suggestion tool — it serves as a research platform exploring how multi-modal AI can improve food utilization, nutrition, and personalized dietary planning.

### 🔍 Research Objectives

Multi-Modal Integration: Combine computer vision (ingredient recognition), NLP (natural query understanding), and knowledge graphs (nutritional relationships) into a unified AI pipeline.

Health-Aware Personalization: Tailor recommendations based on dietary goals, medical restrictions, and user taste history.

Conversational Adaptation: Implement a recommendation engine that learns from user feedback to improve future suggestions.


### 💡 Innovation Highlights

Fridge-to-Recipe AI Pipeline: Converts fridge images directly into structured ingredient lists using object detection.

Nutrition-Aware Semantic Search: Ranks recipes not only by ingredient match but also by health score and personal preferences.

Dynamic Knowledge Graph Integration: Enhances AI reasoning by linking ingredient properties, cooking methods, and health implications.


This project demonstrates the potential of AI systems to bridge food technology, health informatics, and sustainable living, making it a valuable case study for applied research in computer vision, natural language processing, and recommendation systems.




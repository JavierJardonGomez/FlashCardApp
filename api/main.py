import json
import time

from fastapi.encoders import jsonable_encoder
from uvicorn import run
from typing import List
from fastapi import FastAPI, Response, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from api.validate_models.card import Card
from api.validate_models.create_card import CreateCard

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir solicitudes desde cualquier origen
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_id():
    return int(time.time() * 1000)

def create_card_to_card(create_card: CreateCard) -> Card:
    return Card(id=create_id(), title=create_card.title, content=create_card.content)

@app.get("/cards", response_model=List[Card])
def get_cards() -> List[Card]:
    with open('api/cards.json', 'r') as file:
        cards = json.load(file) 
    return cards

@app.get("/card/{id}", response_model=Card)
def get_card(id: int) -> Card:
    with open('api/cards.json', 'r') as file:
        cards = json.load(file)

    for card in cards:
        if card.get("id") == id:
            return card 
        
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")

@app.post("/card")
def create_card(create_card: CreateCard, response: Response):
    with open('api/cards.json', 'r') as file:
        cards = json.load(file)

    card_json = jsonable_encoder(create_card)
    card_json = {"id": create_id(), **card_json}
    cards.append(card_json)

    with open('api/cards.json', 'w') as file:
        json.dump(cards, file, indent=2)

    response.status_code = status.HTTP_201_CREATED

@app.put("/card/{id}")
def edit_card(id: int, create_card: CreateCard, response: Response):
    with open('api/cards.json', 'r') as file:
        cards = json.load(file)

    create_card_json = jsonable_encoder(create_card)

    for i, card in enumerate(cards):
        if card.get('id') == id:
            card["title"] = create_card_json.get("title")
            card["content"] = create_card_json.get("content")

            with open('api/cards.json', 'w') as file:
                json.dump(cards, file, indent=2)

            response.status_code = status.HTTP_200_OK
            return
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")

@app.delete("/card/{id}")
def delete_card(id: int, response: Response):
    with open('api/cards.json', 'r') as file:
        cards = json.load(file)

    for i, card in enumerate(cards):
        if card.get('id') == id:
            del cards[i]
            with open('api/cards.json', 'w') as file:
                json.dump(cards, file, indent=2)

            response.status_code = status.HTTP_200_OK
            return
        
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found")

if __name__ == "__main__":
    run(app, host="127.0.0.1", port=8001)
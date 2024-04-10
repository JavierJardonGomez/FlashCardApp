from pydantic import BaseModel

class Card(BaseModel):
    id : int
    title : str
    content : str
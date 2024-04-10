from pydantic import BaseModel

class CreateCard(BaseModel):
    title : str
    content : str
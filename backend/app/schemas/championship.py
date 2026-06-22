from pydantic import BaseModel


class ChampionshipOut(BaseModel):
    championshipid: str
    name: str

    class Config:
        from_attributes = True
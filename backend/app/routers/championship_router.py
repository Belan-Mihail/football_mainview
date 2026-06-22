from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.models import Championship
from app.schemas.championship import ChampionshipOut

router = APIRouter(
    prefix="/championships",
    tags=["championships"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[ChampionshipOut])
def get_championships(db: Session = Depends(get_db)):
    return db.query(Championship).all()
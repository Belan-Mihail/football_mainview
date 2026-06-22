from app.database import SessionLocal
from app.models.models import Championship

db = SessionLocal()

england = Championship(
    name="England"
)

db.add(england)
db.commit()

db.close()

print("Seed completed")
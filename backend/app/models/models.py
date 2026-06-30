from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Enum
from sqlalchemy.orm import relationship
from ..database import Base

import datetime
import uuid


# -------------------
# CHAMPIONSHIP
# -------------------
class Championship(Base):
    __tablename__ = "championships"

    championshipid = Column(
        String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())
    )

    name = Column(String, nullable=False)

    seasons = relationship("Season", back_populates="championship")
    rounds = relationship("Round", back_populates="championship")
    matches = relationship("Match", back_populates="championship")
    teams = relationship("Team", back_populates="championship")

    def __str__(self):
        return self.name


# -------------------
# SEASON
# -------------------
class Season(Base):
    __tablename__ = "seasons"

    seasonid = Column(
        String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())
    )

    championship_id = Column(String, ForeignKey("championships.championshipid"))

    name = Column(String, nullable=False)
    status = Column(
        Enum("future", "active", "finished", name="season_status"),
        default="active",
    )

    championship = relationship("Championship", back_populates="seasons")

    rounds = relationship("Round", back_populates="season")
    matches = relationship("Match", back_populates="season")

    def __str__(self):
        return self.name


# -------------------
# ROUND
# -------------------
class Round(Base):
    __tablename__ = "rounds"

    roundid = Column(
        String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())
    )

    championship_id = Column(String, ForeignKey("championships.championshipid"))

    season_id = Column(String, ForeignKey("seasons.seasonid"))

    number = Column(Integer, nullable=False)

    status = Column(
        Enum("scheduled", "active", "finished", name="round_status"),
        default="scheduled",
    )

    championship = relationship("Championship", back_populates="rounds")
    season = relationship("Season", back_populates="rounds")

    matches = relationship("Match", back_populates="round")

    def __str__(self):
        return str(self.number)


# -------------------
# TEAM
# -------------------
class Team(Base):
    __tablename__ = "teams"

    teamid = Column(
        String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())
    )

    championship_id = Column(String, ForeignKey("championships.championshipid"))

    name = Column(String, nullable=False)

    status = Column(
        Enum("inactive", "active", name="team_status"),
        default="active",
    )

    championship = relationship("Championship", back_populates="teams")

    goals = relationship("MatchGoal", back_populates="team")

    def __str__(self):
        return self.name


# -------------------
# MATCH
# -------------------
class Match(Base):
    __tablename__ = "matches"

    matchid = Column(
        String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())
    )
    
    display_name = Column(String)

    championship_id = Column(String, ForeignKey("championships.championshipid"))

    season_id = Column(String, ForeignKey("seasons.seasonid"))

    round_id = Column(String, ForeignKey("rounds.roundid"))

    home_team_id = Column(String, ForeignKey("teams.teamid"), nullable=False)

    away_team_id = Column(String, ForeignKey("teams.teamid"), nullable=False)

    home_odds = Column(Float)
    away_odds = Column(Float)

    odds_date = Column(DateTime, default=datetime.datetime.utcnow)

    status = Column(String, default="scheduled")

    match_date = Column(DateTime, nullable=False)

    championship = relationship("Championship", back_populates="matches")

    season = relationship("Season", back_populates="matches")

    round = relationship("Round", back_populates="matches")

    stats = relationship("MatchStats", back_populates="match", uselist=False)

    goals = relationship("MatchGoal", back_populates="match")

    home_team = relationship("Team", foreign_keys=[home_team_id])

    away_team = relationship("Team", foreign_keys=[away_team_id])

    def __str__(self):
        return self.display_name or self.matchid


# -------------------
# MATCH STATS
# -------------------
class MatchStats(Base):
    __tablename__ = "match_stats"

    matchstatsid = Column(
        String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())
    )

    match_id = Column(String, ForeignKey("matches.matchid"))

    home_corners = Column(Integer, default=0)
    away_corners = Column(Integer, default=0)

    home_yellow_cards = Column(Integer, default=0)
    away_yellow_cards = Column(Integer, default=0)

    home_red_cards = Column(Integer, default=0)
    away_red_cards = Column(Integer, default=0)

    home_shots = Column(String)
    away_shots = Column(String)

    match = relationship("Match", back_populates="stats")


# -------------------
# MATCH GOALS
# -------------------
class MatchGoal(Base):
    __tablename__ = "match_goals"

    goalid = Column(
        String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())
    )

    match_id = Column(String, ForeignKey("matches.matchid"))

    team_id = Column(String, ForeignKey("teams.teamid"))

    minute = Column(String, nullable=False)

    match = relationship("Match", back_populates="goals")

    team = relationship("Team", back_populates="goals")

from sqladmin import Admin, ModelView

from .database import engine
from .models.models import (
    Championship,
    Season,
    Team,
    Match,
    MatchGoal,
    MatchStats,
    Round,
)


class ChampionshipAdmin(ModelView, model=Championship):
    column_list = [
        Championship.championshipid,
        Championship.name,
    ]

    form_columns = [
        Championship.name,
    ]


class SeasonAdmin(ModelView, model=Season):
    column_list = [
        Season.name,
        Season.status,
        Season.championship,
    ]

    form_columns = [
        Season.name,
        Season.status,
        Season.championship,
    ]

    column_labels = {
        "championship": "сhampionship_id",
    }


class TeamAdmin(ModelView, model=Team):
    column_list = [
        Team.teamid,
        Team.championship,
        Team.name,
        Team.status,
    ]

    form_columns = [
        Team.teamid,
        Team.championship,
        Team.name,
        Team.status,
    ]

    column_labels = {
        "championship": "championship_id",
    }


class MatchAdmin(ModelView, model=Match):
    column_list = [
        Match.matchid,
        Match.championship,
        Match.season,
        Match.round,
        Match.home_team,
        Match.away_team,
        Match.home_odds,
        Match.away_odds,
        Match.odds_date,
        Match.status,
        Match.match_date,
    ]

    form_columns = [
        Match.matchid,
        Match.championship,
        Match.season,
        Match.round,
        Match.home_team,
        Match.away_team,
        Match.home_odds,
        Match.away_odds,
        Match.odds_date,
        Match.status,
        Match.match_date,
    ]

    column_labels = {
        "championship": "championship_id",
        "season": "season_id",
        "round": "round_id",
    }
    
    column_default_sort = ("match_date", True)
    
    async def on_model_change(
        self,
        data,
        model,
        is_created,
        request
    ):
        model.display_name = (
            f"{model.season.name} | "
            f"R{model.round.number} | "
            f"{model.match_date.strftime('%d.%m.%Y')} | "
            f"{model.home_team.name} - {model.away_team.name}"
        )


class MatchGoalAdmin(ModelView, model=MatchGoal):
    column_list = [
        MatchGoal.goalid,
        MatchGoal.match,
        MatchGoal.team,
        MatchGoal.minute,
    ]

    form_columns = [
        MatchGoal.goalid,
        MatchGoal.match,
        MatchGoal.team,
        MatchGoal.minute,
    ]


class MatchStatsAdmin(ModelView, model=MatchStats):
    column_list = [
        MatchStats.matchstatsid,
        MatchStats.match,
        MatchStats.home_corners,
        MatchStats.away_corners,
        MatchStats.home_yellow_cards,
        MatchStats.away_yellow_cards,
        MatchStats.home_red_cards,
        MatchStats.away_red_cards,
        MatchStats.home_shots,
        MatchStats.away_shots,
    ]

    form_columns = [
        MatchStats.matchstatsid,
        MatchStats.match,
        MatchStats.home_corners,
        MatchStats.away_corners,
        MatchStats.home_yellow_cards,
        MatchStats.away_yellow_cards,
        MatchStats.home_red_cards,
        MatchStats.away_red_cards,
        MatchStats.home_shots,
        MatchStats.away_shots,
    ]

    column_labels = {
        "match": "match_id",
    }


class RoundAdmin(ModelView, model=Round):
    column_list = [
        Round.roundid,
        Round.championship,
        Round.season,
        Round.number,
        Round.status,
    ]

    form_columns = [
        Round.championship,
        Round.season,
        Round.number,
        Round.status,
    ]

    column_labels = {
        "championship": "championship_id",
        "season": "season_id",
    }


def setup_admin(app):
    admin = Admin(app, engine)

    admin.add_view(ChampionshipAdmin)
    admin.add_view(SeasonAdmin)
    admin.add_view(RoundAdmin)
    admin.add_view(TeamAdmin)
    admin.add_view(MatchAdmin)
    admin.add_view(MatchStatsAdmin)
    admin.add_view(MatchGoalAdmin)

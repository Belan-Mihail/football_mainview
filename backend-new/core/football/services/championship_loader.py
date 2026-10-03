from django.shortcuts import get_object_or_404
from django.db.models import Q

from core.models import (
    Championship,
    Team,
    Season,
    Round,
    Match,
)

from core.serializers import (
    ChampionshipSerializer,
    TeamSerializer,
    SeasonSerializer,
    RoundSerializer,
    MatchSerializer,
)


def load_championship_data(championship_slug):

    championship = get_object_or_404(
        Championship,
        slug=championship_slug
    )

    teams = (
        Team.objects
        .filter(championship=championship)
        .order_by("name")
    )

    seasons = (
        Season.objects
        .filter(championship=championship)
        .order_by("id")
    )

    rounds = (
        Round.objects
        .filter(championship=championship)
        .order_by("number")
    )

    matches = (
        Match.objects
        .filter(championship=championship)
        .select_related(
            "home_team",
            "away_team",
            "season",
            "round",
            "stats",
        )
        .prefetch_related("goals")
        .order_by("match_date")
    )

    return {
        "championship": ChampionshipSerializer(championship).data,
        "teams": TeamSerializer(teams, many=True).data,
        "seasons": SeasonSerializer(seasons, many=True).data,
        "rounds": RoundSerializer(rounds, many=True).data,
        "matches": MatchSerializer(matches, many=True).data,
    }
    
    
def load_team_data(team_slug):

    team = get_object_or_404(
        Team,
        slug=team_slug,
    )

    matches = (
        Match.objects
        .filter(
            Q(home_team=team) |
            Q(away_team=team)
        )
        .select_related(
            "championship",
            "home_team",
            "away_team",
            "season",
            "round",
            "stats",
        )
        .prefetch_related(
            "goals",
        )
        .order_by("match_date")
    )

    championship_ids = (
        matches
        .values_list("championship_id", flat=True)
        .distinct()
    )

    season_ids = (
        matches
        .values_list("season_id", flat=True)
        .distinct()
    )

    championships = (
        Championship.objects
        .filter(id__in=championship_ids)
        .order_by("name")
    )

    seasons = (
        Season.objects
        .filter(id__in=season_ids)
        .order_by("-name")
    )

    return {
        "team": TeamSerializer(team).data,
        "matches": MatchSerializer(matches, many=True).data,
        "championships": ChampionshipSerializer(
            championships,
            many=True,
        ).data,
        "seasons": SeasonSerializer(
            seasons,
            many=True,
        ).data,
    }
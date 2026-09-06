from django.shortcuts import get_object_or_404

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
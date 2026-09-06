from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .football.services.championship_loader import load_championship_data

from .models import (
    Championship,
    Team,
    Season,
    Round,
    Match,
)

from .serializers import (
    ChampionshipSerializer,
    TeamSerializer,
    SeasonSerializer,
    RoundSerializer,
    MatchSerializer,
)


class ChampionshipListAPIView(APIView):
    """
    All championships
    """

    def get(self, request):
        championships = Championship.objects.all().order_by("name")

        serializer = ChampionshipSerializer(
            championships,
            many=True
        )

        return Response(serializer.data)


class ChampionshipDataAPIView(APIView):

    def get(self, request, championship_slug):

        data = load_championship_data(championship_slug)

        return Response(data)
    
    
class RoundDataAPIView(APIView):

    def get(
        self,
        request,
        championship_slug,
        season_id,
        round_number,
    ):

        # ======================================================
        # CHAMPIONSHIP
        # ======================================================

        championship = get_object_or_404(
            Championship,
            slug=championship_slug,
        )


        # ======================================================
        # SEASON
        # ======================================================

        season = get_object_or_404(
            Season,
            id=season_id,
            championship=championship,
        )


        # ======================================================
        # ROUND
        # ======================================================

        round_obj = get_object_or_404(
            Round,
            championship=championship,
            season=season,
            number=round_number,
        )


        # ======================================================
        # MATCHES
        # ======================================================

        matches = Match.objects.filter(
            championship=championship,
            season=season,
            round=round_obj,
        ).select_related(
            "home_team",
            "away_team",
        )


        # ======================================================
        # TEAMS
        # ======================================================

        teams = season.teams.all()


        # ======================================================
        # RESPONSE
        # ======================================================

        return Response({
            "championship": ChampionshipSerializer(
                championship
            ).data,

            "season": SeasonSerializer(
                season
            ).data,

            "round": RoundSerializer(
                round_obj
            ).data,

            "teams": TeamSerializer(
                teams,
                many=True,
            ).data,

            "matches": MatchSerializer(
                matches,
                many=True,
            ).data,
        })
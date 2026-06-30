from django.core.management.base import BaseCommand
from core.models import Season, Round, Match, Team
from core.seed_data.season_2025_26 import SEASON_2025_26
from datetime import datetime


class Command(BaseCommand):
    help = "Seed matches from season config"

    def handle(self, *args, **kwargs):

        season = Season.objects.first()
        championship = season.championship

        def get_team(name):
            return Team.objects.get(name=name)

        for round_data in SEASON_2025_26:

            round_obj, _ = Round.objects.get_or_create(
                number=round_data["round"],
                season=season,
                championship=championship,
            )

            match_date = datetime.strptime(
                round_data["date"],
                "%Y-%m-%d %H:%M"
            )

            for home, away in round_data["matches"]:

                Match.objects.get_or_create(
                    championship=championship,
                    season=season,
                    round=round_obj,
                    home_team=get_team(home),
                    away_team=get_team(away),
                    match_date=match_date,
                    status="scheduled",
                )

        self.stdout.write(self.style.SUCCESS("All matches seeded"))
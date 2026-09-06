from django.core.management.base import BaseCommand
from core.models import Match, MatchStats, MatchGoal
from core.seeds.season_2025_26.matches_stats import MATCH_STATS


class Command(BaseCommand):
    help = "Seed match stats"


    def handle(self, *args, **kwargs):

        for item in MATCH_STATS:

            match = Match.objects.get(
                round__number=item["round"],
                home_team__name=item["home"],
                away_team__name=item["away"],
            )

            MatchStats.objects.update_or_create(
                match=match,
                defaults=item["stats"],
            )

            MatchGoal.objects.filter(match=match).delete()

            for goal in item["goals"]:

                MatchGoal.objects.create(
                    match=match,
                    team=match.home_team if goal["team"] == "home" else match.away_team,
                    minute=goal["minute"],
                )

        self.stdout.write(self.style.SUCCESS("Stats seeded"))
from django.core.management.base import BaseCommand

from core.models import Match
from core.seeds.season_2025_26.match_odds import MATCH_ODDS


class Command(BaseCommand):
    help = "Seed match odds"

    def handle(self, *args, **kwargs):

        updated_count = 0

        for item in MATCH_ODDS:

            updated = Match.objects.filter(
                round__number=item["round"],
                home_team__name=item["home"],
                away_team__name=item["away"],
            ).update(
                home_odds=item["home_odds"],
                away_odds=item["away_odds"],
            )

            if updated:
                updated_count += updated
            else:
                self.stdout.write(
                    self.style.WARNING(
                        f'Match not found: {item["home"]} vs {item["away"]} (Round {item["round"]})'
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully updated odds for {updated_count} matches."
            )
        )
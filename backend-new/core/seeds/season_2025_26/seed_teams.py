from django.core.management.base import BaseCommand
from core.models import Championship, Team, Season


TEAM_NAMES = [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Leeds United",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Nottingham Forest",
    "Sunderland",
    "Tottenham Hotspur",
    "West Ham United",
    "Wolverhampton Wanderers"
]


class Command(BaseCommand):
    help = "Seed teams for season 2025/26"

    def handle(self, *args, **kwargs):

        championship = Championship.objects.first()
        season = Season.objects.first()

        teams = []

        for name in TEAM_NAMES:
            team, _ = Team.objects.get_or_create(
                name=name,
                championship=championship
            )
            teams.append(team)

        season.teams.set(teams)

        self.stdout.write(self.style.SUCCESS("Teams created and linked to season"))
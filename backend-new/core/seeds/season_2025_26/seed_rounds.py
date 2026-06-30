from django.core.management.base import BaseCommand
from core.models import Season, Round


class Command(BaseCommand):
    help = "Create 38 rounds for season"

    def handle(self, *args, **kwargs):

        season = Season.objects.first()
        championship = season.championship

        for i in range(1, 39):
            Round.objects.get_or_create(
                number=i,
                season=season,
                championship=championship,
            )

        self.stdout.write(self.style.SUCCESS("38 rounds created"))
from django.contrib import admin
from django.http import JsonResponse
from django.urls import path


from .models import (
    Championship,
    Season,
    Team,
    Round,
    Match,
    MatchStats,
    MatchGoal,
)


@admin.register(Championship)
class ChampionshipAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Season)
class SeasonAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "championship", "status")
    list_filter = ("status", "championship")
    search_fields = ("name",)

    filter_horizontal = ("teams",)

    ordering = ("-name",)


@admin.register(Round)
class RoundAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "number",
        "season",
        "championship",
        "status",
    )

    list_filter = ("season", "status")
    ordering = ("number",)

    search_fields = ("number",)


class MatchGoalInline(admin.TabularInline):
    model = MatchGoal
    extra = 1


class MatchStatsInline(admin.StackedInline):
    model = MatchStats
    can_delete = False


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "season",
        "round",
        "home_team",
        "away_team",
        "match_date",
        "status",
    )

    list_filter = ("season", "round", "status")

    search_fields = (
        "home_team__name",
        "away_team__name",
    )

    inlines = [
        MatchStatsInline,
        MatchGoalInline,
    ]

    class Media:
        js = (
            "admin/js/match_dependencies.js",
            "admin/js/match_goals.js",
        )

    def get_urls(self):
        urls = super().get_urls()

        custom_urls = [
            path(
                "season-data/",
                self.admin_site.admin_view(
                    self.season_data
                ),
                name="match-season-data",
            ),
        ]

        return custom_urls + urls
    

    def season_data(self, request):
        season_id = request.GET.get("season_id")

        if not season_id:
            return JsonResponse({
                "teams": [],
                "rounds": [],
            })

        try:
            season = Season.objects.get(id=season_id)
        except Season.DoesNotExist:
            return JsonResponse({
                "teams": [],
                "rounds": [],
            })

        teams = season.teams.all().order_by("name")

        rounds = season.rounds.all().order_by("number")

        return JsonResponse({
            "teams": [
                {
                    "id": team.id,
                    "name": team.name,
                }
                for team in teams
            ],
            "rounds": [
                {
                    "id": round.id,
                    "name": str(round),
                }
                for round in rounds
            ],
        })


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "championship",
        "status",
    )

    search_fields = ("name",)

    list_filter = (
        "championship",
        "status",
    )
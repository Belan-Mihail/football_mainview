from django.contrib import admin
from .models import Championship, Season, Team, Round, Match, MatchStats, MatchGoal

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
    

@admin.register(Round)
class RoundAdmin(admin.ModelAdmin):
    list_display = ("id", "number", "season", "championship", "status")
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
    search_fields = ("home_team__name", "away_team__name")

    autocomplete_fields = ("home_team", "away_team", "season", "round")

    inlines = [MatchStatsInline, MatchGoalInline]
    

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "championship", "status")
    search_fields = ("name",)
    list_filter = ("championship", "status")
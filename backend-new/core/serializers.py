from rest_framework import serializers

from .models import (
    Championship,
    Team,
    Season,
    Round,
    Match,
    MatchStats,
    MatchGoal,
)


class ChampionshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Championship
        fields = "__all__"


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = "__all__"


class RoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Round
        fields = "__all__"


class MatchStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchStats
        fields = "__all__"


class MatchGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatchGoal
        fields = "__all__"


class MatchSerializer(serializers.ModelSerializer):
    stats = MatchStatsSerializer(read_only=True)
    goals = MatchGoalSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = "__all__"
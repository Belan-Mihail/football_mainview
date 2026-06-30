import uuid
from django.db import models


class Championship(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Championship"
        verbose_name_plural = "Championships"
        

class Team(models.Model):
    championship = models.ForeignKey(
        Championship,
        on_delete=models.CASCADE,
        related_name="teams"
    )

    name = models.CharField(max_length=255)

    status = models.CharField(
        max_length=20,
        choices=[
            ("active", "Active"),
            ("inactive", "Inactive"),
        ],
        default="active"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Team"
        verbose_name_plural = "Teams"
        

class Season(models.Model):
    championship = models.ForeignKey(
        Championship,
        on_delete=models.CASCADE,
        related_name="seasons"
    )

    name = models.CharField(max_length=255)

    status = models.CharField(
        max_length=20,
        choices=[
            ("future", "Future"),
            ("active", "Active"),
            ("finished", "Finished"),
        ],
        default="active"
    )

    teams = models.ManyToManyField(
        Team,
        related_name="seasons",
        blank=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Season"
        verbose_name_plural = "Seasons"
        
class Round(models.Model):
    championship = models.ForeignKey(
        Championship,
        on_delete=models.CASCADE,
        related_name="rounds"
    )

    season = models.ForeignKey(
        Season,
        on_delete=models.CASCADE,
        related_name="rounds"
    )

    number = models.IntegerField()

    status = models.CharField(
        max_length=20,
        choices=[
            ("scheduled", "Scheduled"),
            ("active", "Active"),
            ("finished", "Finished"),
        ],
        default="scheduled"
    )

    def __str__(self):
        return f"Round {self.number}"

    class Meta:
        ordering = ["number"]
        

class Match(models.Model):
    championship = models.ForeignKey(
        Championship,
        on_delete=models.CASCADE,
        related_name="matches"
    )

    season = models.ForeignKey(
        Season,
        on_delete=models.CASCADE,
        related_name="matches"
    )

    round = models.ForeignKey(
        Round,
        on_delete=models.CASCADE,
        related_name="matches"
    )

    home_team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="home_matches"
    )

    away_team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="away_matches"
    )

    display_name = models.CharField(max_length=255, blank=True, null=True)

    home_odds = models.FloatField(null=True, blank=True)
    away_odds = models.FloatField(null=True, blank=True)

    odds_date = models.DateTimeField(auto_now_add=True)

    status = models.CharField(
        max_length=20,
        choices=[
            ("scheduled", "Scheduled"),
            ("finished", "Finished"),
        ],
        default="scheduled"
    )

    match_date = models.DateTimeField()

    def __str__(self):
        return self.display_name or f"{self.home_team} vs {self.away_team}"

    class Meta:
        ordering = ["-match_date"]


class MatchStats(models.Model):
    match = models.OneToOneField(
        Match,
        on_delete=models.CASCADE,
        related_name="stats"
    )

    home_corners = models.IntegerField(default=0)
    away_corners = models.IntegerField(default=0)

    home_yellow_cards = models.IntegerField(default=0)
    away_yellow_cards = models.IntegerField(default=0)

    home_red_cards = models.IntegerField(default=0)
    away_red_cards = models.IntegerField(default=0)

    home_shots = models.IntegerField(default=0)
    away_shots = models.IntegerField(default=0)
    
    home_shots_on_target = models.IntegerField(default=0)
    away_shots_on_target = models.IntegerField(default=0)
    
    home_xg = models.DecimalField(max_digits=4, decimal_places=2, default=0.00)
    away_xg = models.DecimalField(max_digits=4, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Stats for {self.match}"
    

class MatchGoal(models.Model):
    match = models.ForeignKey(
        Match,
        on_delete=models.CASCADE,
        related_name="goals"
    )

    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="goals"
    )

    minute = models.IntegerField()

    def __str__(self):
        return f"{self.team} - {self.minute}'"

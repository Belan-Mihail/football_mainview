from django.urls import path

from .views import (
    ChampionshipListAPIView,
    ChampionshipDataAPIView,
    RoundDataAPIView,
)

urlpatterns = [
    path(
        "championships/",
        ChampionshipListAPIView.as_view(),
        name="championship-list",
    ),
    path(
        "championships/<slug:championship_slug>/data/",
        ChampionshipDataAPIView.as_view(),
        name="championship-data",
    ),
    path(
        "championships/<slug:championship_slug>/rounds/<int:season_id>/<int:round_number>/",
        RoundDataAPIView.as_view(),
        name="round-data",
    ),
]
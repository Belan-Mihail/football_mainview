from django.urls import path

from ..views import (
    ChampionshipListAPIView,
    ChampionshipDataAPIView,
)

urlpatterns = [
    path(
        "championships/",
        ChampionshipListAPIView.as_view(),
        name="championship-list",
    ),
    path(
        "championships/<int:championship_id>/data/",
        ChampionshipDataAPIView.as_view(),
        name="championship-data",
    ),
]
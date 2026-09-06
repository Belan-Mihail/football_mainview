document.addEventListener("DOMContentLoaded", function () {
    const seasonField = document.getElementById("id_season");
    const homeTeamField = document.getElementById("id_home_team");
    const awayTeamField = document.getElementById("id_away_team");
    const roundField = document.getElementById("id_round");

    if (!seasonField) {
        return;
    }

    function clearSelect(select) {
        select.innerHTML = "";

        const option = document.createElement("option");
        option.value = "";
        option.textContent = "---------";

        select.appendChild(option);
    }

    function fillSelect(select, items) {
        clearSelect(select);

        items.forEach(function (item) {
            const option = document.createElement("option");

            option.value = item.id;
            option.textContent = item.name;

            select.appendChild(option);
        });
    }

    function loadSeasonData() {
        const seasonId = seasonField.value;

        if (!seasonId) {
            clearSelect(homeTeamField);
            clearSelect(awayTeamField);
            clearSelect(roundField);
            return;
        }

        // /admin/core/match/add/
        // превращаем в
        // /admin/core/match/season-data/
        const currentPath = window.location.pathname;

        const matchPath = currentPath.substring(
            0,
            currentPath.indexOf("/add/") !== -1
                ? currentPath.indexOf("/add/")
            : currentPath.indexOf("/change/") !== -1
                ? currentPath.indexOf("/change/")
                : currentPath.length
        );

        const url =
            matchPath +
            "/season-data/?season_id=" +
            encodeURIComponent(seasonId);

        console.log("Loading season data:", url);

        fetch(url)
            .then(function (response) {
                console.log(
                    "Season data response:",
                    response.status
                );

                if (!response.ok) {
                    throw new Error(
                        "HTTP error: " + response.status
                    );
                }

                return response.json();
            })
            .then(function (data) {
                console.log("Season data:", data);

                fillSelect(
                    homeTeamField,
                    data.teams
                );

                fillSelect(
                    awayTeamField,
                    data.teams
                );

                fillSelect(
                    roundField,
                    data.rounds
                );
            })
            .catch(function (error) {
                console.error(
                    "Error loading season data:",
                    error
                );
            });
    }

    seasonField.addEventListener(
        "change",
        loadSeasonData
    );

    if (seasonField.value) {
        loadSeasonData();
    }
});
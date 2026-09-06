document.addEventListener("DOMContentLoaded", function () {
    const homeTeamField =
        document.getElementById("id_home_team");

    const awayTeamField =
        document.getElementById("id_away_team");

    if (!homeTeamField || !awayTeamField) {
        return;
    }

    function getSelectedTeams() {
        const homeTeamId = homeTeamField.value;
        const awayTeamId = awayTeamField.value;

        const teams = [];

        if (homeTeamId) {
            const option =
                homeTeamField.options[
                    homeTeamField.selectedIndex
                ];

            if (option) {
                teams.push({
                    id: homeTeamId,
                    name: option.textContent,
                });
            }
        }

        if (
            awayTeamId &&
            awayTeamId !== homeTeamId
        ) {
            const option =
                awayTeamField.options[
                    awayTeamField.selectedIndex
                ];

            if (option) {
                teams.push({
                    id: awayTeamId,
                    name: option.textContent,
                });
            }
        }

        return teams;
    }

    function updateGoalTeamFields() {
        const teams = getSelectedTeams();

        const goalSelects =
            document.querySelectorAll(
                'select[name$="-team"]'
            );

        goalSelects.forEach(function (select) {
            const currentValue = select.value;

            select.innerHTML = "";

            const emptyOption =
                document.createElement("option");

            emptyOption.value = "";
            emptyOption.textContent = "---------";

            select.appendChild(emptyOption);

            teams.forEach(function (team) {
                const option =
                    document.createElement("option");

                option.value = team.id;
                option.textContent = team.name;

                if (
                    String(team.id) ===
                    String(currentValue)
                ) {
                    option.selected = true;
                }

                select.appendChild(option);
            });
        });
    }

    homeTeamField.addEventListener(
        "change",
        updateGoalTeamFields
    );

    awayTeamField.addEventListener(
        "change",
        updateGoalTeamFields
    );

    const goalsContainer =
        document.querySelector(
            "#matchgoal_set-group"
        );

    if (goalsContainer) {
        const observer =
            new MutationObserver(function () {
                updateGoalTeamFields();
            });

        observer.observe(
            goalsContainer,
            {
                childList: true,
                subtree: true,
            }
        );
    }

    updateGoalTeamFields();
});
const players = [];

const gamemodes = [
    "Overall",
    "LTMs",
    "Vanilla",
    "UHC",
    "Pot",
    "NethOP",
    "SMP",
    "DSMP",
    "Sword",
    "Axe",
    "Mace"
];

let currentMode = "Overall";

function renderLeaderboard() {

    const leaderboard = document.getElementById("leaderboard");

    leaderboard.innerHTML = "";

    for (let rank = 1; rank <= 100; rank++) {

        const player = players.find(
            p => p.rank === rank && p.mode === currentMode
        );

        if (player) {

            leaderboard.innerHTML += `
            <div class="player">
                <div class="rank">#${rank}</div>
                <div class="name">${player.name}</div>
                <div class="tier">${player.tier}</div>
            </div>
            `;

        } else {

            leaderboard.innerHTML += `
            <div class="player empty">
                <div class="rank">#${rank}</div>
                <div class="name">EMPTY</div>
                <div class="tier">---</div>
            </div>
            `;
        }
    }
}

function switchMode(mode) {

    currentMode = mode;

    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    const activeTab =
        document.querySelector(`[data-mode="${mode}"]`);

    if (activeTab) {
        activeTab.classList.add("active");
    }

    renderLeaderboard();
}

document
.getElementById("search")
.addEventListener("input", function(e) {

    const value = e.target.value.toLowerCase();

    const leaderboard =
    document.getElementById("leaderboard");

    leaderboard.innerHTML = "";

    const results = players.filter(player =>
        player.name.toLowerCase().includes(value)
    );

    if (value === "") {
        renderLeaderboard();
        return;
    }

    if (results.length === 0) {

        leaderboard.innerHTML = `
        <div class="player empty">
            <div class="rank">-</div>
            <div class="name">No Players Found</div>
            <div class="tier">---</div>
        </div>
        `;

        return;
    }

    results.forEach(player => {

        leaderboard.innerHTML += `
        <div class="player">
            <div class="rank">#${player.rank}</div>
            <div class="name">${player.name}</div>
            <div class="tier">${player.tier}</div>
        </div>
        `;

    });

});

renderLeaderboard();

import { fetchTeamAPI } from "./api.mjs";

// document.addEventListener("DOMContentLoaded", async () => {
//   const favoriteTeams = await fetchFavoriteTeams();
//   const teamList = document.getElementById("team-list");

//   favoriteTeams.forEach(team => {
//     const teamItem = document.createElement("div");
//     teamItem.classList.add("team-item");
//     teamItem.innerHTML = `
//       <h3>${team.name}</h3>
//       <p>League: ${team.league}</p>
//       <p>Stats: ${team.stats}</p>
//     `;
//     teamList.appendChild(teamItem);
//   });
// });
export async function renderTeamData(teamId) {
    const teamData = await fetchTeamAPI(teamId);
    document.querySelector("#team-info").innerHTML = JSON.stringify(teamData);
}
export async function renderTeamData(teamId) {
    const teamData = await fetchTeamAPI(teamId);
    const teamNameElement = document.getElementById("team-name");

    if (!teamData) {
        teamNameElement.textContent = "Failed to load team data.";
        return;
    }
    
    // Set team name
    teamNameElement.textContent = teamData.name;

    // You can populate other sections similarly:
    document.getElementById("team-highlights").innerHTML = teamData.highlights || "No highlights available.";
    document.getElementById("team-stats").innerHTML = `
        <p>Wins: ${teamData.stats.wins}</p>
        <p>Losses: ${teamData.stats.losses}</p>
    `;
    // Continue with fixtures, news, etc.
}

export async function renderTeamFixtures(teamId) {
    const fixturesData = await fetchTeamFixtures(teamId);
    const fixturesElement = document.getElementById("team-fixtures");
    
    if (!fixturesData) {
        fixturesElement.innerHTML = "Failed to load fixtures.";
        return;
    }
    
    // Assume fixturesData contains an array of fixture objects
    fixturesElement.innerHTML = fixturesData.map(fixture => `
        <div>
            <p>${fixture.date} - ${fixture.opponent}</p>
            <p>Location: ${fixture.location}</p>
        </div>
    `).join("");
}
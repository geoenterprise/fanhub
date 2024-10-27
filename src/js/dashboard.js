import { fetchFavoriteTeams, fetchFavoritePlayers } from "./api.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const favoriteTeams = await fetchFavoriteTeams();
  const favoritePlayers = await fetchFavoritePlayers();

  const teamsContainer = document.getElementById("favorite-team");
  const playersContainer = document.getElementById("favorite-player");

  favoriteTeams.forEach(team => {
    const teamElement = document.createElement("div");
    teamElement.textContent = `${team.name} - ${team.league}`;
    teamsContainer.appendChild(teamElement);
  });

  favoritePlayers.forEach(player => {
    const playerElement = document.createElement("div");
    playerElement.textContent = `${player.name} - ${player.position}`;
    playersContainer.appendChild(playerElement);
  });
});
if (teamId) {
    const favoriteTeam = await fetchFavoriteTeams(teamId);
    renderFavoriteTeams(favoriteTeam);
}
if (playerId) {
    const favoritePlayer = await fetchFavoritePlayers(playerId);
    renderFavoritePlayers(favoritePlayer);
}
import { fetchFavoriteTeams, fetchFavoritePlayers } from "./api.mjs";
import { getFavoriteData, loginUser } from "./utils.mjs";
import { fetchPlayerDetails, fetchTeamDetails, fetchTeamFixtures } from "./api.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const favorites = getFavoriteData();
  const accessToken = localStorage.getItem("token"); 

  // Fetch favorite teams and players
  const favoriteTeamsPromises = favorites.teams.map(async (teamId) => {
    return fetchTeamDetails(teamId, accessToken);
  });

  const favoritePlayersPromises = favorites.players.map(async (playerId) => {
    return fetchPlayerDetails(playerId, accessToken);
  });

  // Render favorite teams and players
  const teamsContainer = document.getElementById("favorite-team");
  const playersContainer = document.getElementById("favorite-player");

  // Wait for promises to resolve and then render
  const favoriteTeams = await Promise.all(favoriteTeamsPromises);
  const favoritePlayers = await Promise.all(favoritePlayersPromises);

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

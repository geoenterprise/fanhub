import { fetchPlayerAPI } from "./api.mjs";


export async function getPlayerDetails(playerId) {
    return await fetchAPI(`/v1/players/${playerId}/details`);
}

// export async function renderPlayerData(playerId) {
//     const playerData = await getPlayerDetails(playerId);
//     if (!playerData) return;
//     document.querySelector("#player-info").innerHTML = JSON.stringify(playerData);
// }
// export async function renderPlayerData(playerId) {
//     const playerData = await fetchData(`/players/data/${playerId}`);
//     if (playerData) {
//         document.querySelector("#player-info").innerHTML = JSON.stringify(playerData);
//     }
// }
export async function renderPlayerData(playerId) {
    const playerData = await fetchPlayerAPI(playerId);
    document.querySelector("#player-info").innerHTML = JSON.stringify(playerData);
}
// document.addEventListener("DOMContentLoaded", async () => {
//   const favoritePlayers = await fetchFavoritePlayers();
//   const playerList = document.getElementById("player-list");

//   favoritePlayers.forEach(player => {
//     const playerItem = document.createElement("div");
//     playerItem.classList.add("player-item");
//     playerItem.innerHTML = `
//       <h3>${player.name}</h3>
//       <p>Position: ${player.position}</p>
//       <p>Stats: ${player.stats}</p>
//     `;
//     playerList.appendChild(playerItem);
//   });
// });
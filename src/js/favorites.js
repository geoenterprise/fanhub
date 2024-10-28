import { selectFavorite, setFavoriteData, getFavoriteData } from './utils.mjs';

document.addEventListener("DOMContentLoaded", () => {
    const favorites = getFavoriteData();
    if (favorites && favorites.teams.length && favorites.players.length) {
        window.location.href = "/dashboard/index.html";
    }
});

export let selectedFavorites = { teams: [], players: [] };

// function selectFavorite(type, name) {
//     if (!selectedFavorites[type]) {
//         console.error(`Invalid type: ${type}`);
//         return;
//     }

//     if (!selectedFavorites[type].includes(name)) {
//         selectedFavorites[type].push(name);
//         console.log(`${name} selected as favorite ${type}`);
//         confirmSelection(type, name); // Call confirmSelection after selecting
//     } else {
//         console.log(`${name} is already in your favorites.`);
//     }
// }

function confirmSelection(type, name) {
  // Save favorites to localStorage
  setFavoriteData({
      teams: selectedFavorites.teams,
      players: selectedFavorites.players
  });
  alert(`${name} has been added to your favorite ${type}s!`);
}
// Check localStorage for existing selections
document.addEventListener("DOMContentLoaded", () => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites && favorites.teams.length && favorites.players.length) {
        window.location.href = "/dashboard/index.html";
    }
    const teamElements = document.querySelectorAll(".team-item");
    teamElements.forEach(teamElement => {
      teamElement.addEventListener("click", () => {
        const teamName = teamElement.textContent;
        selectFavorite("teams", teamName);
      });
    });
    const playerElements = document.querySelectorAll(".player-item");
    playerElements.forEach(playerElement => {
      teamElement.addEventListener("click", () => {
        const playerName = playerElement.textContent;
        selectFavorite("teams", playerName);
      });
    });
});

// function confirmSelection() {
//   localStorage.setItem("favorites", JSON.stringify(selectedFavorites));
//   alert("Favorites saved!");
//   window.location.href = "/src/dashboard/index.html";
// }

// function selectFavorite(type, name) {
//   if (type === "team" && !selectedFavorites.teams.includes(name)) {
//     selectedFavorites.teams.push(name);
//   } else if (type === "player" && !selectedFavorites.players.includes(name)) {
//     selectedFavorites.players.push(name);
//   }
//   console.log(`${name} selected as a favorite ${type}`);
// }


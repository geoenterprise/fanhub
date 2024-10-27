import { selectFavorite, confirmSelection } from './utils.mjs';

// Check localStorage for existing selections
document.addEventListener("DOMContentLoaded", () => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites && favorites.teams.length && favorites.players.length) {
        window.location.href = "/dashboard/index.html";
    }
  });
  
  let selectedFavorites = { teams: [], players: [] };
  
  function selectFavorite(type, name) {
    if (type === "team" && !selectedFavorites.teams.includes(name)) {
      selectedFavorites.teams.push(name);
    } else if (type === "player" && !selectedFavorites.players.includes(name)) {
      selectedFavorites.players.push(name);
    }
    console.log(`${name} selected as a favorite ${type}`);
  }
  
  // Function to confirm selection and save to localStorage
  function confirmSelection() {
    localStorage.setItem("favorites", JSON.stringify(selectedFavorites));
    alert("Favorites saved!");
    window.location.href = "/dashboard/index.html";
  }
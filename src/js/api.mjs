// const API_BASE_URL = window.location.hostname === "localhost" ? "http://localhost:4000" : "https://fanhubapp.netlify.app/";
const API_TEAM_BASE_URL = 'https://flashlive-sports.p.rapidapi.com/v1/teams/data?locale=en_INT&team_id=Wtn9Stg0&sport_id=1';
const API_PLAYER_BASE_URL = 'https://flashlive-sports.p.rapidapi.com/v1/players/data?sport_id=1&locale=en_INT&player_id=vgOOdZbd';
import { saveFavorite } from './utils.mjs';
 
export async function searchTeams(teamName) {
  const url = `https://api-football-v1.p.rapidapi.com/v3/teams?search=${teamName}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cbfd803bcemsh184de53f82338d1p112d32jsnb582137d4378',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data && data.response) {
      const teamResults = data.response; // Use data.response to get the actual results
      console.log(teamResults);
      return teamResults; // Return results for display
    } else {
        console.error('Unexpected API response:', data);
        return []; // Return an empty array if the structure is unexpected
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
    return []; // Return an empty array on error
  }
}
// Search for players by name
export async function searchPlayers(query) {
  const url = `https://api-football-v1.p.rapidapi.com/v3/players?league=61&search=${query}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cbfd803bcemsh184de53f82338d1p112d32jsnb582137d4378',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data && data.response) {
      const playerResults = data.response; // Use data.response to get the actual results
      console.log(playerResults);
      return playerResults; // Return results for display
    } else {
        console.error('Unexpected API response:', data);
        return []; // Return an empty array if the structure is unexpected
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
    return []; // Return an empty array on error
  }
}
export function displaySearchResults(containerId, results, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; 

  if (Array.isArray(results) && results.length > 0) {
    results.forEach(item => {
      if (item.player && item.player.name && item.team && item.team.name) {
          const button = document.createElement("button");
          button.textContent = item.team.name;
          button.onclick = () => saveFavorite(itemType, item.id); // Assuming you have an 'id' property somewhere
          container.appendChild(button);
      } else {
          console.error("Item does not have a player name or team name:", item);
      }
    });
} else {
    container.innerHTML = "<p>No results found.</p>"; // Handle empty results
    console.error("Expected results to be an array with items, but got:", results);
}
}
// export async function fetchFavoriteTeams() {
//   try {
//       const response = await fetch(`${BASE_URL}/api/favorites/teams`, {
//           method: "GET",
//           headers: {
//               "Content-Type": "application/json"
//           }
//       });

//       if (!response.ok) {
//           throw new Error("Failed to fetch favorite teams");
//       }

//       const data = await response.json();
//       return data.teams; // Adjust this according to your API response structure
//   } catch (error) {
//       console.error("Error fetching favorite teams:", error);
//       return []; // Return an empty array on error
//   }
// }

// // Function to fetch favorite players
// export async function fetchFavoritePlayers() {
//   try {
//       const response = await fetch(`${BASE_URL}/api/favorites/players`, {
//           method: "GET",
//           headers: {
//               "Content-Type": "application/json"
//           }
//       });

//       if (!response.ok) {
//           throw new Error("Failed to fetch favorite players");
//       }

//       const data = await response.json();
//       return data.players; // Adjust this according to your API response structure
//   } catch (error) {
//       console.error("Error fetching favorite players:", error);
//       return []; // Return an empty array on error
//   }
// }
// export async function fetchPlayerOptions() {
//   const url = 'https://flashlive-sports.p.rapidapi.com/v1/players/data?sport_id=1&locale=en_INT'; // Update URL as needed
//   const options = {
//       method: 'GET',
//       headers: {
//           'x-rapidapi-key': 'your_api_key', // Replace with your actual API key
//           'x-rapidapi-host': 'flashlive-sports.p.rapidapi.com'
//       }
//   };

//   try {
//       const response = await fetch(url, options);
//       const data = await response.json();
//       return data.players; // Assuming the API returns a list of players
//   } catch (error) {
//       console.error("Error fetching player options:", error);
//       return []; // Return an empty array on error
//   }
// }
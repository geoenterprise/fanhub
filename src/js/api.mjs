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
      const playerResults = data.response; 
      console.log(playerResults);
      return playerResults; 
    } else {
        console.error('Unexpected API response:', data);
        return []; 
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
}
export function displaySearchResults(containerId, results, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; 
  if (!Array.isArray(results) || results.length === 0) {
        console.warn("Expected results to be an array with items, but got:", results);
        const message = document.createElement('p');
        message.textContent = "No results found. Please try a different search.";
        container.appendChild(message);
        return; 
    }

    results.forEach(item => {
        let name, id;

        if (type === "player" && item.player && item.player.name) {
            name = item.player.name;
            id = item.player.id;
        } else if (type === "team" && item.team && item.team.name) {
            name = item.team.name;
            id = item.team.id;
        } else {
            console.error('Item does not have a player name or team name:', item);
            return;
        }

        const button = document.createElement('button');
        button.textContent = name;
        button.onclick = () => {
          if (type === "player") {
            localStorage.setItem("selectedPlayer", JSON.stringify({ id, name }));
          } else if (type === "team") {
              localStorage.setItem("selectedTeam", JSON.stringify({ id, name }));
          }
          alert(`${name} selected as ${type}`);
        } 
        container.appendChild(button);
    });
}
export async function fetchPlayerInfo(playerId, season = 2020) {
  const url = `https://api-football-v1.p.rapidapi.com/v3/players?id=${playerId}&season=${season}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cbfd803bcemsh184de53f82338d1p112d32jsnb582137d4378',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    },
  };
  try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching player info:", error);
  }
}

export async function fetchTeamInfo(teamId, season = 2020) {
  const url = `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamId}&season=${season}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cbfd803bcemsh184de53f82338d1p112d32jsnb582137d4378',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    },
  };  
  try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching team info:", error);
  }
}
export async function fetchTeamStats(teamId) {
  const url = `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamId}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cbfd803bcemsh184de53f82338d1p112d32jsnb582137d4378',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching team stats:", error);
    return null; 
  }
}
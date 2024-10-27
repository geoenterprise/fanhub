const API_BASE_URL = window.location.hostname === "localhost" ? "http://localhost:4000" : "https://fanhubapp.netlify.app/";

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/login`,
    SIGNUP: `${API_BASE_URL}/signup`,
    GET_USERS: `${API_BASE_URL}/users`,

};
export async function fetchPlayerAPI(endpoint) {
  const url = 'https://flashlive-sports.p.rapidapi.com/v1/players/data?sport_id=1&locale=en_INT&player_id=vgOOdZbd';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cbfd803bcemsh184de53f82338d1p112d32jsnb582137d4378',
      'x-rapidapi-host': 'flashlive-sports.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchTeamAPI(endpoint) {
  const url = 'https://flashlive-sports.p.rapidapi.com/v1/teams/data?locale=en_INT&team_id=Wtn9Stg0&sport_id=1';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cbfd803bcemsh184de53f82338d1p112d32jsnb582137d4378',
      'x-rapidapi-host': 'flashlive-sports.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchFavoriteTeams() {
  try {
      const response = await fetch(`${BASE_URL}/api/favorites/teams`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });

      if (!response.ok) {
          throw new Error("Failed to fetch favorite teams");
      }

      const data = await response.json();
      return data.teams; // Adjust this according to your API response structure
  } catch (error) {
      console.error("Error fetching favorite teams:", error);
      return []; // Return an empty array on error
  }
}

// Function to fetch favorite players
export async function fetchFavoritePlayers() {
  try {
      const response = await fetch(`${BASE_URL}/api/favorites/players`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });

      if (!response.ok) {
          throw new Error("Failed to fetch favorite players");
      }

      const data = await response.json();
      return data.players; // Adjust this according to your API response structure
  } catch (error) {
      console.error("Error fetching favorite players:", error);
      return []; // Return an empty array on error
  }
}
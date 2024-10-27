
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

// export async function fetchFavoriteTeams() {
//   const favorites = JSON.parse(localStorage.getItem("favorites")) || { teams: [] };
//   const response = await fetch(`https://api.example.com/teams?ids=${favorites.teams.join(",")}`);
//   return response.json();
// }
  
// export async function fetchFavoritePlayers() {
//   const favorites = JSON.parse(localStorage.getItem("favorites")) || { players: [] };
//   const response = await fetch(`https://api.example.com/players?ids=${favorites.players.join(",")}`);
//   return response.json();
// }
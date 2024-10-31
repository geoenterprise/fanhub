// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
});
qs(selector).addEventListener("click", callback);
}
export function renderWithTemplate(template, parent, data, callback) {
    parent.insertAdjacentHTML("afterbegin", template);
    if (callback) {
      callback(data);
    }
}
export async function loadTemplate(path) {
    const response = await fetch(path);
    const html = await response.text();
    const template = document.createElement("template");
    template.innerHTML = html;
    return template;
}
export async function loadHeaderFooter() {
    const headerContent = await loadTemplate("/partials/header.html");
    const footerContent = await loadTemplate("/partials/footer.html");
    const headerElement = document.querySelector("#dynamic-header");
    const footerElement = document.querySelector("#dynamic-footer");

    if (headerElement && headerContent) {
        renderWithTemplate(headerContent.innerHTML, headerElement);
    }
    if (footerElement && footerContent) {
        renderWithTemplate(footerContent.innerHTML, footerElement);
    }
}
// Function to initialize favorite selection (check if already selected in localStorage)
export function initializeFavorites() {
    if (!localStorage.getItem("favorites")) {
        localStorage.setItem("favorites", JSON.stringify({ player: null, team: null }));
    }
}

// Function to check if favorites are already selected
export function checkFavorites() {
    const player = localStorage.getItem("selectedPlayer");
    const team = localStorage.getItem("selectedTeam");
    return player && team;
}

// Function to display selection options on the index page
export function displaySelectionOptions() {
    const playerSection = document.getElementById("players");
    const teamSection = document.getElementById("teams");

    // Call API to fetch player and team options
    fetchPlayerOptions().then(players => {
        players.forEach(player => {
            let playerOption = document.createElement("button");
            playerOption.textContent = player.name;
            playerOption.onclick = () => saveFavorite("player", player.id);
            playerSection.appendChild(playerOption);
        });
    });

    fetchTeamOptions().then(teams => {
        teams.forEach(team => {
            let teamOption = document.createElement("button");
            teamOption.textContent = team.name;
            teamOption.onclick = () => saveFavorite("team", team.id);
            teamSection.appendChild(teamOption);
        });
    });
}

// Save selected favorite to localStorage
export function saveFavorite(type, id) {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    favorites[type] = id;
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
const BASE_URL = window.location.hostname === "localhost" ? "http://localhost:4000" : "https://fanhubapp.netlify.app/";
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

// extract the query string from the URL
export function getParams(params) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(params);
    return product;
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
export async function loginUser(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();
    return data.accessToken; 
}

export function getFavoriteData() {
    return JSON.parse(localStorage.getItem("favorites")) || { teams: [], players: [] };
}
export function setFavoriteData(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
export function selectFavorite(type, name) {
    if (!selectedFavorites[type]) {
        console.error(`Invalid type: ${type}`);
        return;
    }

    if (!selectedFavorites[type].includes(name)) {
        selectedFavorites[type].push(name);
        console.log(`${name} selected as favorite ${type}`);
        confirmSelection(type, name)
    } else {
        console.log(`${name} is already in your favorites.`);
    }
}
export let selectedFavorites = { teams: [], players: [] };

export function confirmSelection(type, name) {
    setFavoriteData({
        teams: selectedFavorites.teams,
        players: selectedFavorites.players
    });
    alert(`${name} has been added to your favorite ${type}s!`);
}
export function setFavorites() {
    localStorage.setItem("favorites", JSON.stringify(selectedFavorites));
}

export function getFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
        Object.keys(favorites).forEach(type => {
            selectedFavorites[type] = favorites[type];
        });
    }
}

getFavorites();
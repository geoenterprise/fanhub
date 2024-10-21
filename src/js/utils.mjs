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
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
}
export async function loadHeaderFooter() {
    const headerContent = await loadTemplate("/partials/header.html");
    const footerContent = await loadTemplate("/partials/footer.html");
    const headerElement = document.querySelector("#dynamic-header");
    const footerElement = document.querySelector("#dynamic-footer");
    renderWithTemplate(headerContent.innerHTML, headerElement);
    renderWithTemplate(footerContent.innerHTML, footerElement);
}
export async function loginUser(email, password) {
    const response = await fetch('https://your-api-endpoint.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const data = await response.json();
    return data.token;  // Assuming the API returns a JWT token
}

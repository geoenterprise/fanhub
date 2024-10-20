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

export async function loadHeaderFooter() {
    const headerContent = await loadTemplate("/partials/header.html");
    const footerContent = await loadTemplate("/partials/footer.html");
    const headerElement = document.querySelector("#dynamic-header");
    const footerElement = document.querySelector("#dynamic-footer");
    renderWithTemplate(headerContent.innerHTML, headerElement);
    renderWithTemplate(footerContent.innerHTML, footerElement);
}

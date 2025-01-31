//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
    const fontSizeInput = document.getElementById("fontsize");
    const fontColorInput = document.getElementById("fontcolor");

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            let [key, value] = cookie.split("=");
            if (key === name) return JSON.parse(decodeURIComponent(value));
        }
        return null;
    }

    function customize(e) {
        e.preventDefault();

        let fontColor = fontColorInput.value;
        let fontSize = fontSizeInput.value;

        let data = { color: fontColor, fontsize: fontSize };
        setCookie("style", JSON.stringify(data), 365);

        applyStyles(data);
    }

    function applyStyles(data) {
        document.body.style.color = data.color;
        document.body.style.fontSize = `${data.fontsize}px`;
        fontColorInput.value = data.color;
        fontSizeInput.value = data.fontsize;
    }

    // Load and apply saved styles
    let savedData = getCookie("style");
    if (savedData) applyStyles(savedData);

    // Attach event listener to form
    document.querySelector("form").addEventListener("submit", customize);
});

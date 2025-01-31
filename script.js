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
            if (key === name) return decodeURIComponent(value);
        }
        return null;
    }

    function customize(e) {
        e.preventDefault();

        let fontColor = fontColorInput.value;
        let fontSize = fontSizeInput.value;

        setCookie("fontcolor", fontColor, 365);
        setCookie("fontsize", fontSize, 365);

        applyStyles();
    }

    function applyStyles() {
        let fontColor = getCookie("fontcolor");
        let fontSize = getCookie("fontsize");

        if (fontColor) {
            document.body.style.color = fontColor;
            fontColorInput.value = fontColor;
        }

        if (fontSize) {
            document.body.style.fontSize = `${fontSize}px`;
            fontSizeInput.value = fontSize;
        }
    }

    // Apply stored preferences on page load
    applyStyles();

    // Attach event listener to form
    document.querySelector("form").addEventListener("submit", customize);
});

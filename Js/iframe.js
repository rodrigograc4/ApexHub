document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.getElementById("id-iframe");
    const fullscreenButton = document.getElementById("fullscreenButton");

    fullscreenButton.addEventListener("click", function() {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    });
});


function openLink(key) {
    const iframe = document.getElementById("id-iframe");
    const links = JSON.parse(localStorage.getItem(key));
    if (links && links.length > 0) {
        iframeText = document.getElementById("iframeText");
        iframeText.style.display = "none";
        iframe.src = links[0];
        iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
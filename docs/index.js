document.getElementsByClassName("copy").onclick = function() {
    navigator.clipboard.writeText(document.getElementById("email").innerText)
    .then(function() {
        console.log("text copied!!!!!!!!");
    });
};
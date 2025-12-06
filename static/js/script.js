/* THEME SWITCH */
function toggleTheme() {
    document.body.classList.toggle("light-theme");
}

/* SEND MESSAGE + TYPING ANIMATION */
function sendMessage() {
    let userText = document.getElementById("user-input").value.trim();
    if (userText === "") return;

    let chatBox = document.getElementById("chat-box");

    // Show user message
    chatBox.innerHTML += `<div class='message user'>${userText}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    document.getElementById("user-input").value = "";

    // Show typing animation
    document.getElementById("typing").style.display = "block";

    // Send message to backend
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
    })
    .then(res => res.json())
    .then(data => {
        // Hide typing animation
        document.getElementById("typing").style.display = "none";

        // Show bot response
        chatBox.innerHTML += `<div class='message bot'>${data.reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(err => {
        // Hide typing animation and show error
        document.getElementById("typing").style.display = "none";
        chatBox.innerHTML += `<div class='message bot'>Sorry, something went wrong.</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
        console.error(err);
    });
}

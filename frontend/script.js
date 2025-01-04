// Dynamic Text Transitions
const texts = [
    "Unlock the Power of Technology with Us",
    "Digital Transformation",
    "Middleware Consultancy",
    "Software Development",
    "Project Evaluation",
    "Architecture Design"
];

let currentIndex = 0;

function changeText() {
    const textElement = document.getElementById("dynamic-text");
    textElement.style.transform = "translateX(100%)";

    setTimeout(() => {
        textElement.textContent = texts[currentIndex];
        textElement.style.transition = "transform 1s ease-in-out";
        textElement.style.transform = "translateX(0)";
        currentIndex = (currentIndex + 1) % texts.length;
    }, 1000);
}

setInterval(changeText, 5000);
changeText();

// Hero Animation
document.addEventListener("DOMContentLoaded", () => {
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
        heroContent.style.transition = "opacity 1s, transform 1s";
    }
});

// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

navMenu.querySelectorAll("li a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://35.232.253.217:5001/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await response.json();
        if (data.success) {
            alert("Your message has been sent successfully!");
        } else {
            alert("Failed to send the message. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});

// Floating Chat Icon Toggle
const chatIcon = document.getElementById("chatIcon");
const chatContainer = document.getElementById("chatContainer");

chatIcon.addEventListener("click", () => {
    chatContainer.classList.toggle("visible");
});

// Chatbot Interaction
document.getElementById("sendMessage").addEventListener("click", async () => {
    const userMessage = document.getElementById("userMessage").value.trim();

    if (userMessage !== "") {
        // Display user's message
        displayMessage(userMessage, "user");

        // Send message to the server (which will communicate with OpenAI)
        try {
            const response = await fetch("http://35.232.253.217:5001/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            if (data.success) {
                // Display ChatGPT's (Ravana's) response
                displayMessage(data.message, "bot");
            } else {
                displayMessage(
                    "Sorry, there was an error processing your message.",
                    "Ravana"
                );
            }
        } catch (error) {
            console.error("Error:", error);
            displayMessage("Sorry I am off line", "Ravana");
        }
    }
});

// Handle Enter Key to Send Message
document.getElementById("userMessage").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) { // Ensure it's just the Enter key and not Shift + Enter
        event.preventDefault(); // Prevent the default behavior (new line in textarea)
        sendMessage();
    }
});

// Handle send message
async function sendMessage() {
    const userMessage = document.getElementById("userMessage").value.trim();

    if (userMessage !== "") {
        // Display user's message
        displayMessage(userMessage, "user");

        // Send message to the server (which will communicate with OpenAI)
        try {
            const response = await fetch("http://35.232.253.217:5001/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            if (data.success) {
                // Display ChatGPT's (Ravana's) response
                displayMessage(data.message, "bot");
            } else {
                displayMessage(
                    "Sorry, there was an error processing your message.",
                    "bot"
                );
            }
        } catch (error) {
            console.error("Error:", error);
            displayMessage("Sorry I am off line", "bot");
        }
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(sender);

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    // Always show avatar for bot messages, not just the first one
    if (sender === "user") {
        const img = document.createElement("img");
        img.src = "user.png";  // Replace with the path to your user avatar
        img.alt = "User";
        avatar.appendChild(img);
    } else if (sender === "bot") {
        const img = document.createElement("img");
        img.src = "ravana_processed.png";  // Replace with the path to your bot avatar
        img.alt = "Bot (Ravana)";
        avatar.appendChild(img);
    }

    const textDiv = document.createElement("div");
    textDiv.classList.add("text");
    textDiv.innerHTML = message;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(textDiv);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    document.getElementById("userMessage").value = ""; // Clear the input field
}

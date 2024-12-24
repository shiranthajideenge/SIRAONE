// Dynamic Text Transitions
const texts = [
    "Transform with SIRAONE",
    "Digital Transformation",
    "Middleware Consultancy",
    "Software Development",
    "Proof of Concept (PoC) & Project Evaluation",
    "Architecture Design"
];

let currentIndex = 0;

function changeText() {
    const textElement = document.getElementById("dynamic-text");
    textElement.style.transform = 'translateX(100%)';

    setTimeout(() => {
        textElement.textContent = texts[currentIndex];
        textElement.style.transition = 'transform 1s ease-in-out';
        textElement.style.transform = 'translateX(0)';
        currentIndex = (currentIndex + 1) % texts.length;
    }, 1000);
}

setInterval(changeText, 5000);
changeText();

// Hero Animation
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        heroContent.style.transition = 'opacity 1s, transform 1s';
    }
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
navMenu.querySelectorAll('li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});



document.getElementById("contactForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:5001/send-email", {
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

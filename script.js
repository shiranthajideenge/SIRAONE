// Array of texts to display
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

    // Apply the slide-out effect to the right
    textElement.style.transform = 'translateX(100%)';

    // Wait for the slide-out transition to finish before changing the text
    setTimeout(() => {
        // Change the text
        textElement.textContent = texts[currentIndex];

        // Apply the slide-in effect from the left
        textElement.style.transition = 'transform 1s ease-in-out'; // Add transition to slide-in
        textElement.style.transform = 'translateX(0)';

        // Move to the next text index
        currentIndex = (currentIndex + 1) % texts.length;
    }, 1000); // Timeout duration should match the transition time (1s)
}

// Call the function every 5 seconds (5000 milliseconds)
setInterval(changeText, 5000);

// Initially set the text
changeText();

// Hero Section Animation on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        heroContent.style.transition = 'opacity 1s, transform 1s';
    }
});

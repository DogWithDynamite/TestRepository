// Select elements 
const dogImage = document.getElementById("dogImage");
const petButton = document.getElementById("petButton");
const petCounter = document.getElementById("petCounter");
const barkSound = document.getElementById("barkSound");
const scratchSound = document.getElementById("scratchSound");
const muteButton = document.getElementById("muteButton");
const muteIcon = muteButton.querySelector("i");
const dogNameInput = document.getElementById("dogName");
const nameContainer = document.getElementById("nameContainer");
const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.volume = 0.25;

// Game variables
let petCount = 0;
let maxPets = Math.floor(Math.random() * 3) + 5;
let wagging = false;
let firstPet = true;
let isAnimating = false;

// Constants
const ANIMATION_DURATION = 5000;

// Set initial image
window.onload = function () {
    dogImage.src = "../Brana_Final/assets/puppy_sad.png";
};

// Handle pet button click
petButton.addEventListener("click", () => {
    if (!wagging && !isAnimating) {
        petCount++;
        petCounter.textContent = `Pets: ${petCount}`;
        isAnimating = true;
        petButton.disabled = true;

        scratchSound.currentTime = 0;
        scratchSound.play().catch((error) => {
            console.warn("Scratch sound blocked:", error);
        });

        const isFinalPet = petCount === maxPets;

        const petGif = firstPet
            ? "../Brana_Final/assets/puppy_pet_sad.gif"
            : "../Brana_Final/assets/puppy_pet.gif";

        dogImage.src = `${petGif}?${Date.now()}`;
        firstPet = false;

        setTimeout(() => {
            if (isFinalPet) {
                wagging = true;
                playWagAnimation();
            } else {
                dogImage.src = "../Brana_Final/assets/puppy_default.png";
                if (!startBlinking.started) startBlinking();
                isAnimating = false;
                petButton.disabled = false;
            }
        }, ANIMATION_DURATION);
    }
});

// Play wagging animation
function playWagAnimation() {
    dogImage.src = "../Brana_Final/assets/puppy_wag.gif?" + Date.now();
    petButton.style.display = "none";

    barkSound.play().catch((error) => {
        console.warn("Audio play was blocked:", error);
    });

    setTimeout(() => {
        dogImage.src = "../Brana_Final/assets/puppy_default.png";
        isAnimating = false;
        petButton.style.display = "inline-block";
    }, ANIMATION_DURATION);
}

// Random Blinking
function startBlinking() {
    startBlinking.started = true;

    function blink() {
        if (!wagging && !isAnimating) {
            dogImage.src = "../Brana_Final/assets/puppy_default_blink.png";
            setTimeout(() => {
                dogImage.src = "../Brana_Final/assets/puppy_default.png";
            }, 200);
        }

        const nextBlink = Math.random() * (8000 - 3000) + 3000;
        setTimeout(blink, nextBlink);
    }

    blink();
}

// Play music after user interaction
document.addEventListener(
    "click",
    () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch((e) =>
                console.error("Playback failed:", e)
            );
        }
    },
    { once: true }
);

// Mute toggle
muteButton.addEventListener("click", () => {
    backgroundMusic.muted = !backgroundMusic.muted;
    muteIcon.className = backgroundMusic.muted
        ? "fas fa-volume-mute"
        : "fas fa-volume-up";
});

// Dog name input
dogNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const name = dogNameInput.value.trim();
        if (name !== "") {
            nameContainer.innerHTML = `<span class="dog-name"><strong>${name}</strong></span>`;
            const nameContainerDiv = document.querySelector(".name-container");
            if (nameContainerDiv) {
                nameContainerDiv.style.display = "none";
            }
        }
    }
});

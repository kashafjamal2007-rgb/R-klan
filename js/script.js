
document.addEventListener("DOMContentLoaded", function () {
 
    const slider = document.querySelector(".review-slider");
    const viewport = document.querySelector(".fullbox");
    const track = document.querySelector(".review-track");
 
    if (!slider || !viewport || !track) return;
 
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
 
    let originalCards = Array.from(track.children);
 
    if (originalCards.length < 2) return;
 
    // Clone cards for continuous looping
    originalCards.forEach(function (card) {
        track.appendChild(card.cloneNode(true));
    });
 
    let index = 0;
    let timer;
    let step = 0;
    let visibleCards = 3;
 
    function getVisibleCards() {
        if (window.innerWidth <= 600) {
            return 1;
        } else if (window.innerWidth <= 900) {
            return 2;
        }
        return 3;
    }
 
    function updateStep() {
        const cards = track.children;
 
        if (!cards.length) return;
 
        visibleCards = getVisibleCards();
 
        const firstCard = cards[0];
        const secondCard = cards[1];
 
        step = secondCard
            ? secondCard.offsetLeft - firstCard.offsetLeft
            : firstCard.offsetWidth;
    }
 
    function moveSlider() {
        updateStep();
 
        if (step <= 0) return;
 
        track.style.transform =
            "translateX(-" + (index * step) + "px)";
    }
 
    function nextSlide() {
        updateStep();
 
        index++;
 
        track.style.transition = "transform 0.55s ease-in-out";
 
        moveSlider();
 
        // Reset after reaching the cloned cards
        if (index >= originalCards.length) {
            setTimeout(function () {
                track.style.transition = "none";
                index = 0;
                moveSlider();
 
                // Restore transition after reset
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        track.style.transition =
                            "transform 0.55s ease-in-out";
                    });
                });
            }, 560);
        }
    }
 
    function prevSlide() {
        updateStep();
 
        if (index <= 0) {
            track.style.transition = "none";
            index = originalCards.length;
            moveSlider();
 
            track.offsetHeight;
 
            track.style.transition = "transform 0.55s ease-in-out";
        }
 
        index--;
        moveSlider();
    }
 
    function startAutoSlide() {
        stopAutoSlide();
 
        timer = setInterval(function () {
            nextSlide();
        }, 3000);
    }
 
    function stopAutoSlide() {
        clearInterval(timer);
    }
 
    nextBtn.addEventListener("click", function () {
        nextSlide();
        startAutoSlide();
    });
 
    prevBtn.addEventListener("click", function () {
        prevSlide();
        startAutoSlide();
    });
 
    // Pause on mouse hover
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);
 
    // Recalculate after resizing
    window.addEventListener("resize", function () {
        track.style.transition = "none";
        moveSlider();
        track.offsetHeight;
        track.style.transition = "transform 0.55s ease-in-out";
    });
 
    // Start automatic sliding
    updateStep();
    moveSlider();
    startAutoSlide();
 
});

 
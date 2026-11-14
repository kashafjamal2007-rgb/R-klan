
// document.addEventListener("DOMContentLoaded", function () {
 
//     const slider = document.querySelector(".review-slider");
//     const viewport = document.querySelector(".fullbox");
//     const track = document.querySelector(".review-track");
 
//     if (!slider || !viewport || !track) return;
 
//     const prevBtn = slider.querySelector(".prev");
//     const nextBtn = slider.querySelector(".next");
 
//     let originalCards = Array.from(track.children);
 
//     if (originalCards.length < 2) return;
 
//     // Clone cards for continuous looping
//     originalCards.forEach(function (card) {
//         track.appendChild(card.cloneNode(true));
//     });
 
//     let index = 0;
//     let timer;
//     let step = 0;
//     let visibleCards = 3;
 
//     function getVisibleCards() {
//         if (window.innerWidth <= 600) {
//             return 1;
//         } else if (window.innerWidth <= 900) {
//             return 2;
//         }
//         return 3;
//     }
 
//     function updateStep() {
//         const cards = track.children;
 
//         if (!cards.length) return;
 
//         visibleCards = getVisibleCards();
 
//         const firstCard = cards[0];
//         const secondCard = cards[1];
 
//         step = secondCard
//             ? secondCard.offsetLeft - firstCard.offsetLeft
//             : firstCard.offsetWidth;
//     }
 
//     function moveSlider() {
//         updateStep();
 
//         if (step <= 0) return;
 
//         track.style.transform =
//             "translateX(-" + (index * step) + "px)";
//     }
 
//     function nextSlide() {
//         updateStep();
 
//         index++;
 
//         track.style.transition = "transform 0.55s ease-in-out";
 
//         moveSlider();
 
//         // Reset after reaching the cloned cards
//         if (index >= originalCards.length) {
//             setTimeout(function () {
//                 track.style.transition = "none";
//                 index = 0;
//                 moveSlider();
 
//                 // Restore transition after reset
//                 requestAnimationFrame(function () {
//                     requestAnimationFrame(function () {
//                         track.style.transition =
//                             "transform 0.55s ease-in-out";
//                     });
//                 });
//             }, 560);
//         }
//     }
 
//     function prevSlide() {
//         updateStep();
 
//         if (index <= 0) {
//             track.style.transition = "none";
//             index = originalCards.length;
//             moveSlider();
 
//             track.offsetHeight;
 
//             track.style.transition = "transform 0.55s ease-in-out";
//         }
 
//         index--;
//         moveSlider();
//     }
 
//     function startAutoSlide() {
//         stopAutoSlide();
 
//         timer = setInterval(function () {
//             nextSlide();
//         }, 3000);
//     }
 
//     function stopAutoSlide() {
//         clearInterval(timer);
//     }
 
//     nextBtn.addEventListener("click", function () {
//         nextSlide();
//         startAutoSlide();
//     });
 
//     prevBtn.addEventListener("click", function () {
//         prevSlide();
//         startAutoSlide();
//     });
 
//     // Pause on mouse hover
//     slider.addEventListener("mouseenter", stopAutoSlide);
//     slider.addEventListener("mouseleave", startAutoSlide);
 
//     // Recalculate after resizing
//     window.addEventListener("resize", function () {
//         track.style.transition = "none";
//         moveSlider();
//         track.offsetHeight;
//         track.style.transition = "transform 0.55s ease-in-out";
//     });
 
//     // Start automatic sliding
//     updateStep();
//     moveSlider();
//     startAutoSlide();
 
// });
 
document.addEventListener("DOMContentLoaded", function () {
 
    const track = document.querySelector(".slider-track");
    const nextBtn = document.querySelector(".slider-btn.next");
    const prevBtn = document.querySelector(".slider-btn.prev");
 
    if (!track || !nextBtn || !prevBtn) return;
 
    let timer;
    let isMoving = false;
 
    // Original cards ko clone karein
    const originalCards = Array.from(track.children);
 
    originalCards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });
 
    // Ek card ki width calculate karein
    function getStep() {
        const card = track.querySelector(".rev-item");
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
 
        return card.getBoundingClientRect().width + gap;
    }
 
    // Next Slide (Left Direction)
    function nextSlide() {
 
        if (isMoving) return;
 
        isMoving = true;
 
        track.style.transition = "transform 0.6s ease-in-out";
        track.style.transform = `translateX(-${getStep()}px)`;
 
        track.addEventListener("transitionend", function handler() {
 
            track.removeEventListener("transitionend", handler);
 
            track.style.transition = "none";
            track.appendChild(track.firstElementChild);
            track.style.transform = "translateX(0)";
 
            isMoving = false;
 
        }, { once: true });
    }
 
    // Previous Slide (Right Direction)
    function prevSlide() {
 
        if (isMoving) return;
 
        isMoving = true;
 
        track.style.transition = "none";
        track.prepend(track.lastElementChild);
 
        track.style.transform = `translateX(-${getStep()}px)`;
 
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
 
                track.style.transition = "transform 0.6s ease-in-out";
                track.style.transform = "translateX(0)";
 
                track.addEventListener("transitionend", function handler() {
                    track.removeEventListener("transitionend", handler);
                    isMoving = false;
                }, { once: true });
 
            });
        });
    }
 
    // Automatic Slider - 2 Seconds
    function startSlider() {
        stopSlider();
        timer = setInterval(nextSlide, 3000);
    }
 
    function stopSlider() {
        clearInterval(timer);
    }
 
    // Next Button
    nextBtn.addEventListener("click", function () {
        stopSlider();
        nextSlide();
        startSlider();
    });
 
    // Previous Button
    prevBtn.addEventListener("click", function () {
        stopSlider();
        prevSlide();
        startSlider();
    });
 
    // Hover par automatic slider pause
    const slider = document.querySelector(".review-slider");
 
    slider.addEventListener("mouseenter", stopSlider);
    slider.addEventListener("mouseleave", startSlider);
 
    // Start automatic slider
    startSlider();
 
});
 

 
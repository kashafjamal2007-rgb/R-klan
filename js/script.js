


//---------------------------------------------------------- header-nav----------------------------------------------------------
 
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
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
const toggleIcon = navToggle.querySelector("i");


navToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("active");

  if (isOpen) {
    toggleIcon.classList.replace("fa-bars", "fa-xmark");
  } else {
    toggleIcon.classList.replace("fa-xmark", "fa-bars");
  }
});



 

 
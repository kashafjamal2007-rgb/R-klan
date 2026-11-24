


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
//--------------------------------------------------------- yourfamily---------------------------------------------------------



const sliderWrapper = document.querySelector('.slider-wrapper');
const track = document.getElementById('sliderTrack');
const originalSlides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');

const totalSlides = originalSlides.length;
const slideIntervalTime = 3000; // 3 सेकंड
let currentIndex = 1; // क्लोन की वजह से 1 से शुरू करेंगे
let isTransitioning = false;
let slideInterval;

// 1. Infinite Loop के लिए पहली और आखिरी स्लाइड का Clone बनाना
const firstClone = originalSlides[0].cloneNode(true);
const lastClone = originalSlides[totalSlides - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, originalSlides[0]);

// शुरुआती पोजीशन सेट करना
track.style.transform = `translateX(-${currentIndex * 100}%)`;

// 2. Pagination Dots बनाना
originalSlides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        if (isTransitioning) return;
        goToSlide(index + 1);
        resetInterval();
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    let dotIndex = currentIndex - 1;
    if (currentIndex === 0) dotIndex = totalSlides - 1;
    if (currentIndex === totalSlides + 1) dotIndex = 0;
    dots[dotIndex].classList.add('active');
}

function goToSlide(index, animate = true) {
    if (animate) {
        isTransitioning = true;
        track.style.transition = 'transform 0.6s ease-in-out';
    } else {
        track.style.transition = 'none';
    }
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

// Transition खत्म होने पर बिना झटके के असली स्लाइड पर शिफ्ट करना (Seamless Loop)
track.addEventListener('transitionend', () => {
    isTransitioning = false;
    if (currentIndex === 0) {
        goToSlide(totalSlides, false);
    } else if (currentIndex === totalSlides + 1) {
        goToSlide(1, false);
    }
});

function nextSlide() {
    if (isTransitioning) return;
    goToSlide(currentIndex + 1);
}

function prevSlide() {
    if (isTransitioning) return;
    goToSlide(currentIndex - 1);
}

// 3. Autoplay और Hover पर Pause करने का लॉजिक
function startInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideIntervalTime);
}

function stopInterval() {
    clearInterval(slideInterval);
}

function resetInterval() {
    stopInterval();
    startInterval();
}

startInterval();

// माउस Hover करने पर रुकेगा और हटने पर चलेगा
sliderWrapper.addEventListener('mouseenter', stopInterval);
sliderWrapper.addEventListener('mouseleave', () => {
    if (!isDragging) startInterval();
});

// 4. हाथ से (Mouse Drag और Touch Swipe) स्लाइड करने का लॉजिक
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Mouse Events
sliderWrapper.addEventListener('mousedown', dragStart);
sliderWrapper.addEventListener('mousemove', dragMove);
sliderWrapper.addEventListener('mouseup', dragEnd);
sliderWrapper.addEventListener('mouseleave', () => {
    if (isDragging) dragEnd();
});

// Touch Events (Mobile के लिए)
sliderWrapper.addEventListener('touchstart', dragStart, { passive: true });
sliderWrapper.addEventListener('touchmove', dragMove, { passive: true });
sliderWrapper.addEventListener('touchend', dragEnd);

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function dragStart(event) {
    if (isTransitioning) return;
    isDragging = true;
    startPos = getPositionX(event);
    stopInterval();
    track.style.transition = 'none';
    prevTranslate = -currentIndex * sliderWrapper.offsetWidth;
}

function dragMove(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
    track.style.transform = `translateX(${currentTranslate}px)`;
}

function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    // अगर 50px से ज्यादा खिसकाया गया है तो स्लाइड बदलें
    if (movedBy < -50) {
        nextSlide();
    } else if (movedBy > 50) {
        prevSlide();
    } else {
        goToSlide(currentIndex); // वापस अपनी जगह पर लाएं
    }
    
    // अगर माउस स्लाइडर के बाहर है तो टाइमर फिर से शुरू करें
    if (!sliderWrapper.matches(':hover')) {
        startInterval();
    }
}
// const track = document.getElementById('sliderTrack');
// const sliderWrapper = document.querySelector('.slider-wrapper');
// const originalSlides = document.querySelectorAll('.slide');
// const dotsContainer = document.getElementById('sliderDots');

// let currentIndex = 0;
// const totalOriginalSlides = originalSlides.length;
// const slideIntervalTime = 3000; // हर 3 सेकंड में स्लाइड बदलेगी
// let slideInterval;
// let isTransitioning = false;

// // 1. Seamless Loop के लिए पहली स्लाइड का Clone बनाकर अंत में जोड़ें
// const firstClone = originalSlides[0].cloneNode(true);
// track.appendChild(firstClone);

// // 2. Dots बनाना (सिर्फ ओरिजिनल स्लाइड्स के लिए)
// originalSlides.forEach((_, index) => {
//     const dot = document.createElement('span');
//     dot.classList.add('dot');
//     if (index === 0) dot.classList.add('active');
//     dot.addEventListener('click', () => {
//         if (isTransitioning) return;
//         goToSlide(index);
//         resetInterval();
//     });
//     dotsContainer.appendChild(dot);
// });

// const dots = document.querySelectorAll('.dot');

// function updateDots() {
//     dots.forEach(dot => dot.classList.remove('active'));
//     // अगर क्लोन स्लाइड (आखिरी इंडेक्स) पर हैं, तो पहला डॉट (0) एक्टिव करें
//     const activeDotIndex = currentIndex % totalOriginalSlides;
//     dots[activeDotIndex].classList.add('active');
// }

// function goToSlide(index) {
//     isTransitioning = true;
//     currentIndex = index;
//     track.style.transition = 'transform 0.6s ease-in-out';
//     track.style.transform = `translateX(-${currentIndex * 100}%)`;
//     updateDots();
// }

// function nextSlide() {
//     if (isTransitioning) return;
//     goToSlide(currentIndex + 1);
// }

// // 3. ट्रांज़िशन खत्म होने पर क्लोन स्लाइड को चुपचाप असली पहली स्लाइड से बदलें
// track.addEventListener('transitionend', () => {
//     isTransitioning = false;
//     if (currentIndex === totalOriginalSlides) {
//         track.style.transition = 'none'; // एनीमेशन बंद करें ताकि जंप न दिखे
//         currentIndex = 0;
//         track.style.transform = `translateX(0%)`;
//     }
// });

// // 4. Auto-play कंट्रोल फंक्शन्स
// function startInterval() {
//     clearInterval(slideInterval);
//     slideInterval = setInterval(nextSlide, slideIntervalTime);
// }

// function stopInterval() {
//     clearInterval(slideInterval);
// }

// function resetInterval() {
//     stopInterval();
//     startInterval();
// }

// // 5. Hover करने पर स्लाइडर को Stop और Resume करना
// sliderWrapper.addEventListener('mouseenter', stopInterval);
// sliderWrapper.addEventListener('mouseleave', startInterval);

// // स्लाइडर शुरू करें
// startInterval();




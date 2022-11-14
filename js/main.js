const carousel = document.querySelector('.carousel')
const slides = [...carousel.querySelectorAll(".carousel__slide")];
const contents = document.querySelector(".carousel__contents");
const previousButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');
const dots = [...carousel.querySelectorAll(".carousel__dot")];

// => Function to shift current slide to target slide:
const switchSlide = (currentSlide, targetSlide) => {
  const destination = getComputedStyle(targetSlide).left;
  contents.style.transform = `translateX(-${destination})`;
  currentSlide.classList.remove("is-selected");
  targetSlide.classList.add("is-selected");
};

// For displaying the next slide on each click:
nextButton.addEventListener('click', event => {
  const currentSlide = contents.querySelector(".is-selected");
  const nextSlide = currentSlide.nextElementSibling;
  const indexCurrentSlide = slides.indexOf(currentSlide);

  // Shifting to next slide by calling function:
  switchSlide(currentSlide, nextSlide);

  // => Shifting dot selection to next:
  dots[indexCurrentSlide].classList.remove("is-selected");
  dots[indexCurrentSlide + 1].classList.add("is-selected");

  // => Remove next button according to last slide, and show if otherwise:
  if (!nextSlide.nextElementSibling) {
    nextButton.classList.add("is-hidden");
  }

  if (nextSlide.previousElementSibling) {
    previousButton.classList.remove("is-hidden");
  }
})

// For previous button to display the previous slide on each click:
previousButton.addEventListener('click', event => {
  const currentSlide = contents.querySelector(".is-selected");
  const previousSlide = currentSlide.previousElementSibling;
  const indexCurrentSlide = slides.indexOf(currentSlide);

  // Shifting to previous slide by calling function:
  switchSlide(currentSlide, previousSlide);

  // Shifting dot selection to previous:
  dots[indexCurrentSlide].classList.remove("is-selected");
  dots[indexCurrentSlide - 1].classList.add("is-selected");

  // => Remove previous button according at first slide, and show if otherwise:
  if (!previousSlide.previousElementSibling) {
    previousButton.classList.add("is-hidden");
  }

  if (previousSlide.nextElementSibling) {
    nextButton.classList.remove("is-hidden");
  }
})

// For navigating carousel with dots:

dots.forEach(dot => {
  dot.addEventListener('click', event => {
    
    const clickedDotIndex = dots.findIndex(d => d === dot);

    const slideToShow = slides[clickedDotIndex];
    const dotsLeftDistance = getComputedStyle(slideToShow).left;
    contents.style.transform = `translate(-${dotsLeftDistance})`;

    const currentSlide = contents.querySelector('.is-selected');
    currentSlide.classList.remove('is-selected');
    slideToShow.classList.add('is-selected')

    const currentDot = dots[clickedDotIndex];
    currentDot.classList.add('is-selected');
    dots.forEach(dot => {
      if (dot !== currentDot) {
        dot.classList.remove("is-selected")
      }
    })

    // => Showing and hiding prev and next buttons according to the dot clicked:
    if(clickedDotIndex === 0) {
      nextButton.classList.remove("is-hidden");
      previousButton.classList.add("is-hidden");
    } else if (clickedDotIndex === dots.length - 1) {
      previousButton.classList.remove("is-hidden");
      nextButton.classList.add("is-hidden");
    } else {
      previousButton.classList.remove("is-hidden");
      nextButton.classList.remove("is-hidden");
    }
  })
})

// For positioning slides width JS => this is required due to RWD for page:
const slideWidth = slides[0].getBoundingClientRect().width

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px'
})
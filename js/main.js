const carousel = document.querySelector('.carousel')
const slides = [...carousel.querySelectorAll(".carousel__slide")];
const contents = document.querySelector(".carousel__contents");
const previousButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');
const dotsContainer = carousel.querySelector('.carousel__dots')
const dots = [...carousel.querySelectorAll(".carousel__dot")];

// => Function to shift current slide to target slide:
const switchSlide = (currentSlide, targetSlide) => {
  const destination = getComputedStyle(targetSlide).left;
  contents.style.transform = `translateX(-${destination})`;
  currentSlide.classList.remove("is-selected");
  targetSlide.classList.add("is-selected");
};

// => Function to select/de-select target dot:
const highlightDot = (currentDot, targetDot) => {
  currentDot.classList.remove('is-selected');
  targetDot.classList.add('is-selected');
}

// => Function to show/hide carousel buttons:
const showHideArrowButtons = clickedDotIndex => {
  if (clickedDotIndex === 0) {
    nextButton.classList.remove("is-hidden");
    previousButton.classList.add("is-hidden");
  } else if (clickedDotIndex === dots.length - 1) {
    previousButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    previousButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
}

// For displaying the next slide on each click:
nextButton.addEventListener('click', event => {
  const currentSlide = contents.querySelector(".is-selected");
  const nextSlide = currentSlide.nextElementSibling;
  const indexCurrentSlide = slides.indexOf(currentSlide);
  const currentDot = dotsContainer.querySelector(".is-selected");
  const nextDot = currentDot.nextElementSibling;

  // Shifting to next slide by calling function:
  switchSlide(currentSlide, nextSlide);

  // => Shifting dot selection to next:
  highlightDot(currentDot, nextDot);

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
  const currentDot = dotsContainer.querySelector('.is-selected');
  const previousDot = currentDot.previousElementSibling;

  // Shifting to previous slide by calling function:
  switchSlide(currentSlide, previousSlide);

  // Shifting dot selection to previous:
  highlightDot(currentDot, previousDot);

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
    const currentSlide = contents.querySelector('.is-selected')
    const clickedDotIndex = dots.findIndex(d => d === dot);
    const slideToShow = slides[clickedDotIndex];
    const currentDot = dotsContainer.querySelector('.is-selected');

    switchSlide(currentSlide, slideToShow)

    // Shifting dot selection to clicked dot:
    highlightDot(currentDot, dot);

    // Showing and hiding prev and next buttons according to the dot clicked:
    showHideArrowButtons(clickedDotIndex);
  })
})

// For positioning slides width JS => this is required due to RWD for page:
const slideWidth = slides[0].getBoundingClientRect().width

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px'
})
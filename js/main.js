const carousel = document.querySelector('.carousel');
const contents = carousel.querySelector(".carousel__contents");
const previousButton = carousel.querySelector('.previous-button');
const nextButton = carousel.querySelector('.next-button');
const dotsContainer = carousel.querySelector('.carousel__dots')

const slides = [...carousel.querySelectorAll(".carousel__slide")];
const dots = [...carousel.querySelectorAll(".carousel__dot")];

// => Function to get current slide index:
const getCurrentSlideIndex = () => {
  const currentSlide = contents.querySelector('.is-selected');
  return slides.findIndex(slide => slide === currentSlide);
}

// => Function to shift current slide to target slide:
const switchSlide = (currentSlideIndex, targetSlideIndex) => {
  const currentSlide = slides[currentSlideIndex];
  const targetSlide = slides[targetSlideIndex];
  const destination = getComputedStyle(targetSlide).left;

  contents.style.transform = `translateX(-${destination})`;
  currentSlide.classList.remove("is-selected");
  targetSlide.classList.add("is-selected");
}

// => Function to select/de-select target dot:
const highlightDot = (currentSlideIndex, targetSlideIndex) => {
  const currentDot = dots[currentSlideIndex];
  const targetDot = dots[targetSlideIndex];
  currentDot.classList.remove('is-selected');
  targetDot.classList.add('is-selected');
}

// => Function to show/hide carousel buttons:
const showHideArrowButtons = targetSlideIndex => {
  if (targetSlideIndex === 0) {
    nextButton.classList.remove("is-hidden");
    previousButton.classList.add("is-hidden");
  } else if (targetSlideIndex === dots.length - 1) {
    previousButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    previousButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
}

// For displaying the next slide on each click:
nextButton.addEventListener('click', event => {
  const currentSlideIndex = getCurrentSlideIndex();
  const nextSlideIndex = currentSlideIndex + 1;

  // Shifting to next slide by calling function:
  switchSlide(currentSlideIndex, nextSlideIndex);

  // => Shifting dot selection to next:
  highlightDot(currentSlideIndex, nextSlideIndex);

  // => Remove next button according to last slide, and show if otherwise:
  showHideArrowButtons(nextSlideIndex);
})

// For previous button to display the previous slide on each click:
previousButton.addEventListener('click', event => {
  const currentSlideIndex = getCurrentSlideIndex();
  const previousSlideIndex = currentSlideIndex - 1;

  switchSlide(currentSlideIndex, previousSlideIndex);
  highlightDot(currentSlideIndex, previousSlideIndex);
  showHideArrowButtons(previousSlideIndex);
})

// For navigating carousel with dots:
dots.forEach(dot => {
  dot.addEventListener('click', event => {
    const currentSlideIndex = getCurrentSlideIndex();
    const targetSlideIndex = dots.findIndex(d => d === dot);

    switchSlide(currentSlideIndex, targetSlideIndex);
    highlightDot(currentSlideIndex, targetSlideIndex);
    showHideArrowButtons(targetSlideIndex);
  })
})

// For positioning slides width JS => this is required due to RWD for page:
const slideWidth = slides[0].getBoundingClientRect().width

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
})
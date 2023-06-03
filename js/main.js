/* eslint-disable no-unused-vars */
// Required variables:
const carousel = document.querySelector('.carousel');
const contents = carousel.querySelector(".carousel__contents");
const previousButton = carousel.querySelector('.previous-button');
const nextButton = carousel.querySelector('.next-button');
const slides = [...carousel.querySelectorAll(".carousel__slide")];

const dotsContainer = createDots(slides);
const dots = [...dotsContainer.children];

// ========================
// Functions
// ========================

/**
 * => Create the dots for carousel
 * 
 * @returns HTML for dots
 * 
 */
function createDots(slides) {
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('carousel__dots');

  slides.forEach(slide => {
    const dot = document.createElement('button');
    dot.classList.add('carousel__dot');

    if (slide.classList.contains('is-selected')) {
      dot.classList.add('is-selected');
    }

    dotsContainer.appendChild(dot);
  })

  return dotsContainer;
}

/** => Get current slide index
 * 
 * @returns The index of current slide
 * 
 */
const getCurrentSlideIndex = () => {
  const currentSlide = contents.querySelector('.is-selected');
  return slides.findIndex(slide => slide === currentSlide);
}

/**
 * => To shift current slide to target slide
 * 
 * @param {number} currentSlideIndex
 * @param {number} targetSlideIndex
 * 
 **/

const switchSlide = (currentSlideIndex, targetSlideIndex) => {
  const currentSlide = slides[currentSlideIndex];
  const targetSlide = slides[targetSlideIndex];
  const destination = getComputedStyle(targetSlide).left;

  contents.style.transform = `translateX(-${destination})`;
  currentSlide.classList.remove("is-selected");
  targetSlide.classList.add("is-selected");
}

/**
 * => To highlight selected dot
 * 
 * @param {number} currentSlideIndex
 * @param {number} targetSlideIndex
 * 
 **/
const highlightDot = (currentSlideIndex, targetSlideIndex) => {
  const currentDot = dots[currentSlideIndex];
  const targetDot = dots[targetSlideIndex];
  currentDot.classList.remove('is-selected');
  targetDot.classList.add('is-selected');
}

/**
 * => To show/hide carousel buttons:
 * 
 * @param {number} targetSlideIndex
 * 
 **/
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

// ========================
// Execution
// ========================

// To add dotsContainer to HTML:
carousel.appendChild(dotsContainer);

// For displaying the next slide on each click:
nextButton.addEventListener('click', event => {
  const currentSlideIndex = getCurrentSlideIndex();
  const nextSlideIndex = currentSlideIndex + 1;

  // Shifting to next slide by calling function:
  switchSlide(currentSlideIndex, nextSlideIndex);

  // Shifting dot selection to next:
  highlightDot(currentSlideIndex, nextSlideIndex);

  // Remove next button according to last slide, and show if otherwise:
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
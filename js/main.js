const slides = Array.from(document.querySelectorAll(".carousel__slide"));
const contents = document.querySelector(".carousel__contents");
const previousButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');
const dots = Array.from(document.querySelectorAll(".carousel__dot"));

// For displaying the next slide on each click:
nextButton.addEventListener('click', event => {
  const currentSlide = contents.querySelector(".is-selected");
  const nextSlide = currentSlide.nextElementSibling;
  const destination = getComputedStyle(nextSlide).left;
  const indexCurrentSlide = slides.indexOf(currentSlide);

  // => To 'move' the slide to the next slide:
  contents.style.transform = "translateX(-" + destination + ")";

  currentSlide.classList.remove("is-selected");
  nextSlide.classList.add("is-selected");

  dots[indexCurrentSlide].classList.remove("is-selected");
  dots[indexCurrentSlide + 1].classList.add("is-selected");

  // => To add and remove previous and next buttons from display according to the first & last locations of slide:
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
  const nextSlide = currentSlide.nextElementSibling;
  const indexCurrentSlide = slides.indexOf(currentSlide);

  const destination = getComputedStyle(previousSlide).left;
  contents.style.transform = "translateX(-" + destination + ")";

  currentSlide.classList.remove("is-selected");
  previousSlide.classList.add("is-selected");

  dots[indexCurrentSlide].classList.remove("is-selected");
  dots[indexCurrentSlide - 1].classList.add("is-selected");

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
    let clickedDotIndex;
    for (let index = 0; index < dots.length; index++) {
      if (dots[index] === dot) {
        clickedDotIndex = index;
      }
    }

    const slideToShow = slides[clickedDotIndex];
    const dotsLeftDistance = getComputedStyle(slideToShow).left;
    contents.style.transform = "translate(-" + dotsLeftDistance + ")";

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
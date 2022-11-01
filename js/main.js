// Start writing JavaScript here!

// Required variables for use:
// const carousel = document.querySelector('.carousel')
const slides = Array.from(document.querySelectorAll(".carousel__slide"));
const contents = document.querySelector(".carousel__contents");
const previousButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');
const dots = Array.from(document.querySelectorAll(".carousel__dot"));

// Code for next button to display the next slide on each click:
nextButton.addEventListener('click', event => {
  const currentSlide = contents.querySelector(".is-selected");
  const nextSlide = currentSlide.nextElementSibling;
  const destination = getComputedStyle(nextSlide).left;
  const indexCurrentSlide = slides.indexOf(currentSlide);

  // => To 'move' the slide to the next slide (remember syntax for setting CSS with JS => _____.style._____):
  contents.style.left = "-" + destination;

  // => To update the location of the '.is-selected' class for current and next slide:
  // => Required to keep the current slide status active and set a 'marker' on it for moving to the next slide.
  currentSlide.classList.remove("is-selected");
  nextSlide.classList.add("is-selected");

  // => To update the location of the '.is-selected' class of the current and next dot:
  // => Required for its style deactivation (current dot) & activation (next dot)
  dots[indexCurrentSlide].classList.remove("is-selected");
  dots[indexCurrentSlide + 1].classList.add("is-selected");

  // => To add and remove previous and next buttons from display according to the first & last locations of slide:
  // => '.is-hidden' class is already included in CSS. 
  if (!nextSlide.nextElementSibling) {
    nextButton.classList.add("is-hidden");
  }

  if (nextSlide.previousElementSibling) {
    previousButton.classList.remove("is-hidden");
  }
})

// Code for previous button to display the previous slide on each click:
previousButton.addEventListener('click', event => {
  const currentSlide = contents.querySelector(".is-selected");
  const previousSlide = currentSlide.previousElementSibling;
  const nextSlide = currentSlide.nextElementSibling;
  const indexCurrentSlide = slides.indexOf(currentSlide);

  const destination = getComputedStyle(previousSlide).left;
  contents.style.left = "-" + destination;

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

// Code 1 for navigating carousel with dots:

dots.forEach(dot => {
  // => Adding a click event listener to each dot:
  dot.addEventListener('click', event => {
    // => Identifying each dot's index:
    let clickedDotIndex;
    for (let index = 0; index < dots.length; index++) {
      if (dots[index] === dot) {
        clickedDotIndex = index;
      }
    }
    // console.log(clickedDotIndex);

    // Defining which slide to show with the clicked dot:
    const slideToShow = slides[clickedDotIndex];
    // console.log(slideToShow)

    // => From here, the code to navigate the slides will be similar to the ones for the prev and next buttons:
    const dotsLeftDistance = getComputedStyle(slideToShow).left;
    // console.log(dotsLeftDistance) // for 1st slide: 0px, 2nd: 800px, 3rd: 1600px, ...

    // => For navigating the contents of each slide according to distance based on dot clicked:
    contents.style.left = '-' + dotsLeftDistance;

    // => Adding and removing 'is-selected' to slides as before:
    const currentSlide = contents.querySelector('.is-selected');
    currentSlide.classList.remove('is-selected');
    // => Adding it to your clicked dot:
    slideToShow.classList.add('is-selected')

    // => Adding and remove 'is-selected' to dots (updating dot state required for its css style when selected):
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


// Alternate Code 2 for navigating carousel with dots (with events delegation):

/*
const dotsContainer = document.querySelector(".carousel__dots");

dotsContainer.addEventListener('click', event => {
  // => Identifying each dot's index:
  const dot = event.target.closest('button');

  let clickedDotIndex;
  if (dot) {
    clickedDotIndex = dots.indexOf(dot);
  }

  // console.log(clickedDotIndex);

  // Defining which slide to show with the clicked dot:
  const slideToShow = slides[clickedDotIndex];
  // console.log(slideToShow)

  // => From here, the code to navigate the slides will be similar to the ones for the prev and next buttons:
  const dotsLeftDistance = getComputedStyle(slideToShow).left;
  // console.log(dotsLeftDistance) // for 1st slide: 0px, 2nd: 800px, 3rd: 1600px, ...

  // => For navigating the contents of each slide according to distance based on dot clicked:
  contents.style.left = '-' + dotsLeftDistance;

  // => Adding and removing 'is-selected' to slides as before:
  const currentSlide = contents.querySelector('.is-selected');
  currentSlide.classList.remove('is-selected');
  // => Adding it to your clicked dot:
  slideToShow.classList.add('is-selected')

  // => Adding and remove 'is-selected' to dots (updating dot state required for its css style when selected):
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
*/

// For positioning slides width JS => this is required due to RWD for page:

// => For understanding the slideWidth variable:
const slideWidth = slides[0].getBoundingClientRect().width

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px'
})
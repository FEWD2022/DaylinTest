// NOTES & CITATION - Referenced https://getbootstrap.com/docs/4.0/components/carousel/, https://medium.com/@marcusmichaels/how-to-build-a-carousel-from-scratch-in-vanilla-js-9a096d3b98c9 and https://www.w3schools.com/bootstrap/bootstrap_ref_js_carousel.asp. 

const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);


const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

// arrange slides 
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';
// slides[3].style.left = slideWidth * 3 + 'px';
// slides[4].style.left = slideWidth * 4 + 'px';

// create a loop for slides instead of manually writing, yes plz per the above 

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);


const moveToSlide = (a, b, d) => {

  a.style.transform = 'translateX(-' + d.style.left + ')';
  b.classList.remove('current-slide');
  d.classList.add('current-slide');
}

// when left, move slides to the left unz unz
prevButton.addEventListener('click', e => {

  const currentSlide = track.querySelector('.current-slide');
  console.log (currentSlide.previousElementSibling);

  const prevSlide = currentSlide.previousElementSibling;

moveToSlide (track, currentSlide, prevSlide)
});

// when right, move slides to the right unz unz
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;

  moveToSlide(track, currentSlide, nextSlide);
});

// when scrolling prev getting to 1st photo, don't allow a user to click, get rid of the arrow (not display block, if photo = dhpink, then button displays none...then same for next with butterfly.png)
// // NOTES & CITATION - Referenced https://getbootstrap.com/docs/4.0/components/carousel/, https://medium.com/@marcusmichaels/how-to-build-a-carousel-from-scratch-in-vanilla-js-9a096d3b98c9 and https://www.w3schools.com/bootstrap/bootstrap_ref_js_carousel.asp. 
// // Adjusted line 37 and 5 and naming conventions


// !(function(d){
//   // Variables to get carousel items, count and set the stage
//   var itemClassName = "photo",
//       items = d.getElementsByClassName(itemClassName),
//       totalItems = items.length,
//       slide = 0,
//       moving = true; 

//   // Function to set carousel
//   function setInitialClasses() {

//     // Target items in carousel
 
//     items[totalItems - 1].classList.add("prev");
//     items[0].classList.add("active");
//     items[1].classList.add("next");
//   }

//   // Click arrows
//   function setEventListeners() {
//     var next = d.getElementsByClassName('car_button--next')[0],
//         prev = d.getElementsByClassName('car_button--prev')[0];

//     next.addEventListener('click', moveNext);
//     prev.addEventListener('click', movePrev);
//   }

//   // Disable interaction =
//   function disableInteraction() {
//     moving = true;

//     setTimeout(function(){
//       moving = false
//     }, 500);
//   }

//   function moveCarouselTo(slide) {

//     // Check if carousel is moving, if not, allow interaction
//     if(!moving) {

//       // temporarily disable interactivity
//       disableInteraction();

//       // Set variables for the current next and previous slide, as well as the potential next or previous slide.
//       var newPrevious = slide - 1,
//           newNext = slide + 1,
//           oldPrevious = slide - 2,
//           oldNext = slide + 2;

//       // Test # of Carousel items
//       if ((totalItems - 1) >= 4) {

//         // Checks if the new potential slide is out of bounds and sets slide numbers
//         if (newPrevious <= 0) {
//           oldPrevious = (totalItems - 1);
//         } else if (newNext >= (totalItems - 1)){
//           oldNext = 0;
//         }

//         // Check if current slide is at the beginning or end and sets slide numbers
//         if (slide === 0) {
//           newPrevious = (totalItems - 1);
//           oldPrevious = (totalItems - 2);
//           oldNext = (slide + 1);
//         } else if (slide === (totalItems -1)) {
//           newPrevious = (slide - 1);
//           newNext = 0;
//           oldNext = 1;
//         }

//         // Carousel's transitions.

//         // Based on the current slide, reset to default classes.
//         items[oldPrevious].className = itemClassName;
//         items[oldNext].className = itemClassName;

//         // Add the new classes
//         items[newPrevious].className = itemClassName + " prev";
//         items[slide].className = itemClassName + " active";
//         items[newNext].className = itemClassName + " next";
//       }
//     }
//   }

//   // Next navigation handler
//   function moveNext() {

//     // Check if moving
//     if (!moving) {

//       // If it's the last slide, reset to 0, else +1
//       if (slide === (totalItems - 1)) {
//         slide = 0;
//       } else {
//         slide++;
//       }

//       // Move carousel to updated slide
//       moveCarouselTo(slide);
//     }
//   }

//   // Previous navigation handler
//   function movePrev() {

//     // Check if moving
//     if (!moving) {

//       // If it's the first slide, set as the last slide, else -1
//       if (slide === 0) {
//         slide = (totalItems - 1);
//       } else {
//         slide--;
//       }

//       // Move carousel to updated slide
//       moveCarouselTo(slide);
//     }
//   }

//   // Initialise carousel
//   function initCarousel() {
//     setInitialClasses();
//     setEventListeners();

//     // Set moving to false now that the carousel is ready
//     moving = false;
//   }

//   initCarousel();

// }(document));
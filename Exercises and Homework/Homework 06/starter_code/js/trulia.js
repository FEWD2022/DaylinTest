

let truliaCards = document.getElementsByClassName("trulia-grid-item");



document.addEventListener('DOMContentLoaded', function(event) {

// Toggle the navigation
document.querySelector(".trulia-nav-toggle").addEventListener('click'
,function(e){
  e.preventDefault();
  let navSet = document.querySelectorAll('.trulia-nav > nav ul');

  for(let n=0;n<navSet.length;n++){
      navSet[n].classList.toggle('trulia-nav-mobilehide');
  }

});

//* I'm reviewing the solution code but am totally lost on the toggle above because it looks like removal is below? I'm totally confused here 





// Loop through all the cards
for (var i = 0; i < truliaCards.length; i++){
  // Add a click listener on each card
  truliaCards[i].addEventListener('click',function(){      
      // Remove the featured class
document.querySelector
//* Totally unsure how to remove the featured class. I know this isn't right but just not sure how to do this


      // Add the featured class on the one clicked on
      this.classList.add('trulia-featured-grid-item');
    });
  }


  });  




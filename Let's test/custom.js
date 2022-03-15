jQuery(document).ready(function($){
	console.log('locked and loaded');
	
	// Navigation Social Icons
	var facebook = $('li#menu-item-40 a');
	facebook.html('<i class="fab fa-facebook-f"></i>');
	var instagram = $('li#menu-item-41 a');
	instagram.html('<i class="fab fa-instagram"></i>');
	var pinterest = $('li#menu-item-42 a');
	pinterest.html('<i class="fab fa-pinterest-p"></i>');
	var twitter = $('li#menu-item-43 a');
	twitter.html('<i class="fab fa-twitter"></i>');
	
	// Make Navbar transparent
	var nav = $('.navbar');
	
	var navPosition = $(nav).offset().top;
	console.log(navPosition);
	     
      //Make nav transparent at top of screen
      if (navPosition === 0) {
          nav.addClass('transparent');
      } else {
          nav.removeClass('transparent');
      }
  
      $(window).scroll(function() {
          if ($(document).scrollTop() === 0) {
            nav.addClass('transparent');
          } else {
            nav.removeClass('transparent');
          }
        });
    
    // Make Navbar background black on open
    
    var toggler = $('.navbar-toggler');
    
    toggler.click(function(){
		$(nav).toggleClass('black-bg'); 
    });
    
    
    var facebookHTML = $('.menu-item-40 a');
    var instagramHTML = $('.menu-item-41 a');
    var pinterestHTML = $('.menu-item-42 a');
    var twitterHTML = $('.menu-item-43 a');
    
    
    facebookHTML.appendTo('.show');
    
    
			
});
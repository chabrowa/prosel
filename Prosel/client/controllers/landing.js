Session.setDefault('page', 'landing');

Template.landing.helpers({
  goToHome: function () {
    return Session.get('page') === 'landing';
  }
});

Template.landing.events({
  'click a.page-scroll': function(event){
        var $anchor = $(event.currentTarget);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
  },
  'click .navbar-collapse ul li a': function(event){
      $('.navbar-toggle:visible').click();
  },
  'click #loginBtn': function(event){
    event.preventDefault();
    Session.set('page', 'index');
  }
});

Template.landing.onRendered(function(){
  	var docElem = document.documentElement,
		header = document.querySelector( '.navbar-default' ),
		didScroll = false,
		changeHeaderOn = 300;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 250 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'navbar-shrink' );
		}
		else {
			classie.remove( header, 'navbar-shrink' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();
});

Template.body.onRendered(function () {
  $('body').scrollspy({
    target: '.navbar-fixed-top'
  })
});


$(document).ready(function() {
	$('#fullpage').fullpage({
		verticalCentered: true,
		keyboardScrolling: true,
		animateAnchor: true,
		recordHistory: true,
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['Inicio','Menu','Reservaciones','Galeria','Ubicacion', 'Contacto'],   
		anchors: ['Home','Menue','Reserve','Gallery','Location','Contact'],                    
		resize : true,
		controlArrows: false,
		slidesNavigation: false,
		responsiveSlides: true,
		resetSliders: true,
		responsiveHeight: 900,
		scrollOverflow: true,
		// bigSectionsDestination: 'top',
		// normalScrollElements: '.grid',
		// normalScrollElementTouchThreshold: 3,
		afterRender: function(){
			$('video').get(0).play();
		},
		onLeave: function(index, nextIndex, direction) {

		    $('.menuhit').removeClass(function(index, css) {
		        return (css.match(/(^|\s)show-\S+/g) || []).join(' ');
		    });

		    if (nextIndex == '1') {
		        $('.menuhit').addClass('show-1');
		    }

		    if (nextIndex == '2') {
		        $('.menuhit').addClass('show-2');
		    }

		    if (nextIndex == '3') {
		        $('.menuhit').addClass('show-3');
		    }

		    if (nextIndex == '4') {
		        $('.menuhit').addClass('show-4');
		    }

		    if (nextIndex == '5') {
		        $('.menuhit').addClass('show-5');
		    }

		    /*if(nextIndex == '2'){
		        $('#eag-menu-total').addClass('open');
		    } else {
		        $('#eag-menu-total').removeClass('open');
		    }*/

		}
	});

	var $grid = $('.grid').imagesLoaded( function() {
	  $grid.masonry({
	    itemSelector: '.grid-item',
	    columnWidth: '.grid-sizer',
	    percentPosition: true
	  });
	});

	$(function () {
	    $('.gal').fluidbox();
	});
});


(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		list = overlay.querySelector("nav").getElementsByTagName("li"),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}
	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
	for (i = 0, len = list.length; i < len; i++){
	list[i].addEventListener( 'click', toggleOverlay );
	}

})();
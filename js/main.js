$(document).ready(function() {
    $('#fullpage').fullpage({
        verticalCentered: true,
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Inicio', 'Menu', 'Reservaciones', 'Galeria', 'Ubicacion', 'Contacto'],
        anchors: ['Home', 'Menue', 'Reserve', 'Gallery', 'Location', 'Contact'],
        controlArrows: false,
        slidesNavigation: false,
        resetSliders: true,
        responsiveHeight: 800,
        bigSectionsDestination: 'top',
        normalScrollElementTouchThreshold: 8,
        touchSensitivity: 15,
        // scrollOverflow: true,
        // normalScrollElements: '.grid',
        afterRender: function() {
            $('video').get(0).play();
            var $grid = $('.grid').imagesLoaded(function() {
                $grid.masonry({
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true
                });
                $(function() {
                    $('.gal').fluidbox();
                });
            });
            
        },
        afterLoad: function(anchorLink, index) {
            // null
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
            if (nextIndex == '6') {
                $('.menuhit').addClass('show-6');
            }
            /*if(nextIndex == '2'){
                $('#eag-menu-total').addClass('open');
            } else {
                $('#eag-menu-total').removeClass('open');
            }*/

        }
    });     

    $("#contactoform").on('submit', function() {
        var that = $(this),
            url = that.attr('action'),
            type = that.attr('method'),
            data = {};
        that.find('[name]').each(function(index, value) {
            var that = $(this),
                name = that.attr('name'),
                value = that.val();
            data[name] = value;
        });
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: function(response) {
                var respuesta = JSON.parse(response);
                if (respuesta.success) {
                    // swal(respuesta.message, "", "success");
                    alert('Enviado');
                    that.trigger('reset');
                } else { 
                    // swal(respuesta.message, "", "error");
                    alert('Ops, hubo un error');
                }

            }
        });
        return false;
    });


});


(function() {
    var triggerBttn = document.getElementById('trigger-overlay'),
        overlay = document.querySelector('div.overlay'),
        closeBttn = overlay.querySelector('button.overlay-close');
    list = overlay.querySelector("nav").getElementsByTagName("li"),
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        support = { transitions: Modernizr.csstransitions };

    function toggleOverlay() {
        if (classie.has(overlay, 'open')) {
            classie.remove(overlay, 'open');
            classie.add(overlay, 'close');
            var onEndTransitionFn = function(ev) {
                if (support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(transEndEventName, onEndTransitionFn);
                }
                classie.remove(overlay, 'close');
            };
            if (support.transitions) {
                overlay.addEventListener(transEndEventName, onEndTransitionFn);
            } else {
                onEndTransitionFn();
            }
        } else if (!classie.has(overlay, 'close')) {
            classie.add(overlay, 'open');
        }
    }
    triggerBttn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);
    for (i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener('click', toggleOverlay);
    }

})();

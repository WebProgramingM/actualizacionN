$(document).ready(function() {
    $('#fullpage').fullpage({
        verticalCentered: true,
        keyboardScrolling: true,
        animateAnchor: true,
        // autoScrolling: false,
        recordHistory: true,
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Inicio', 'Menu', 'Reservaciones', 'Galeria', 'Ubicacion', 'Contacto'],
        anchors: ['Home', 'Menue', 'Reserve', 'Gallery', 'Location', 'Contact'],
        controlArrows: false,
        slidesNavigation: false,
        resetSliders: true,
        responsiveHeight: 640,
        bigSectionsDestination: 'top',
        normalScrollElementTouchThreshold: 8,
        touchSensitivity: 15,
        // scrollOverflow: true,
        // normalScrollElements: '.grid',
        afterRender: function() {
            $('video').get(0).play();
            // var $grid = $('.grid').imagesLoaded(function() {
            //     $grid.masonry({
            //         itemSelector: '.grid-item',
            //         columnWidth: '.grid-sizer',
            //         percentPosition: true
            //     });
            //     // $(function() {
            //     //     $('.gal').fluidbox({
            //     //         loader: true,
            //     //         stackIndexDelta: 180,
            //     //         viewportFill: 1
            //     //     });
            //     // });
            // });
            
        },
        afterLoad: function(anchorLink, index) {
            
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



var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.nomads_gallery');




function initMap() {
    var myLatLng = {lat: 21.161799, lng: -86.824032};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        zoom: 15,
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#ff8000"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#e87502"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
    });
    var image = 'img/marker.png';
    var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
    });
   
    marker.addListener('click', function() {
            map.setZoom(19);
            map.setCenter(marker.getPosition());
    });
}

function popup() {
    document.getElementById("popup").style.display = "none";
}


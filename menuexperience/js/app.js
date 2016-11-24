var nomadsApp = new Framework7({
    ModalTitlle: "Nomads Cancun",
    animateNavBackIcon: true
    });

var $$ = Dom7;

// Add main view
var mainView = nomadsApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true,
    domCache: true
});
var dynamicPageIndex = 0;

$$(document).on('click','.ks-generate-page', function() {
  var id = $(this).attr("data");
    $.getJSON( "foods.json", function( data ) {
        var plate = data.foods[id];
        var tags = [];
        var photos = [];
        var bebidas = [];
        $.each(plate.food.tags, function (key, val) {

            var tag = "<div class='chip'><div class='chip-label'>"+val+"</div></div>";
            tags.push(tag);
        });
        $.each(plate.food.banner,function (key, val) {
            photos.push('<div class="swiper-slide">'+
            '<div class="swiper-zoom-container"><img src="'+val+'"/></div>'+
            '</div>');
        });

        $.each(plate.food.bebidas,function (key, val) {
            bebidas.push( '<li>'+
                '<div class="item-content">'+
                ' <div class="item-inner">'+
                ' <div class="item-title">'+val+'</div>'+
                '</div>'+
                '</div>'+
                '</li>');
        });

        mainView.router.loadContent(
            '<!-- Top Navbar-->' +
            '<div class="navbar">' +
            '  <div class="navbar-inner">' +
            '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span></span></a></div>' +
            '    <div class="center sliding"><span style="font-weight:300;">MENU</span><span style="font-weight: bold;">EXPERIENCE</span></div>' +
            '    <div class="right sliding"><a href="#" class="link open-popover" data-popover=".popover-links"><i class="fa fa-share-alt" aria-hidden="true"></i></a></div>' +
            '  </div>' +
            '</div>' +
            '<div class="pages">' +
            '  <!-- Page, data-page contains page name-->' +
            '  <div data-page="dynamic-content" class="page">' +
            '    <!-- Scrollable page content-->' +
            '    <div class="page-content">' +

            '<div class="title content-block row">'+
            '<div class="col-75"><h2>'+plate.food.nombre+'</h2></div>'+
            '<div class="col-25"><p>'+plate.food.precio+'</p></div>'+
            '</div>'+
            '<div data-pagination=".swiper-pagination" data-zoom="true" data-next-button=".swiper-button-next" data-prev-button=".swiper-button-prev" class="swiper-container swiper-init ks-demo-slider">'+
            '<div class="swiper-wrapper">'+
            photos.join("")+
            '</div>'+
            '<div class="swiper-pagination"></div>'+
            '</div>'+
            '<div class="content-block">' +
            '<div class="row">'+

            '<div class="col-50">'+
            tags.join("")+
            '</div>'+
            '<div class="col-50">'+
            '<div id="rate" style="float: right;"></div>'+
            '</div>'+
            '</div>'+
            '<p>'+ plate.food.longDescripcion+'</p>' +
                '<div class="maridaje">'+
                '<h2>Maridaje</h2>'+
                '</div>'+
            '<div class="list-block">'+
            '<ul>'+
            bebidas.join("")+
            '</ul>'+
            '</div>'+
          
            '</div>'+
            '</div>' +

            '    </div>' +
            '  </div>' +
            '</div>'
        );
        $("#rate").rateYo({
            normalFill: "#A0A0A0",
            starWidth: "25px",
            rating: plate.food.rate,
            readOnly: true
        });

    });



});

$(document).ready(function () {
    $.getJSON( "foods.json", function( data ) {
        var items = [];
        $.each(data.foods, function (key,val) {
            var item = "<li><a href='#' class='item-link item-content ks-generate-page' data='"+key+"'>"+
                "<div class='item-media'><img src='"+val.food.foto+"' width='80'/></div>"+
                "<div class='item-inner'>"+
                "<div class='item-title-row'>"+
                "<div class='item-title'>"+val.food.nombre+"</div>"+
                "<div class='item-after'>"+val.food.precio+"</div>";

                item +="</div>"+
                "<div class='item-text'>"+val.food.descripcion+"</div>"+
                "</div></a>"+
                "</li>";
            items.push(item);
        });
        $("<ul/>",{ "class":"mylist",html:items.join("")}).appendTo(".media-list");
    });
});


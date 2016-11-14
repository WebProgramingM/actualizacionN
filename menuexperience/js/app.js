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
        $.each(plate.food.tags, function (key, val) {
            console.log(val);
            var tag = "<div class='chip'><div class='chip-label'>"+val+"</div></div>";
            tags.push(tag);
        });
        console.log(tags);

        mainView.router.loadContent(
            '<!-- Top Navbar-->' +
            '<div class="navbar">' +
            '  <div class="navbar-inner">' +
            '    <div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
            '    <div class="center sliding">' + plate.food.nombre + '</div>' +
            '  </div>' +
            '</div>' +
            '<div class="pages">' +
            '  <!-- Page, data-page contains page name-->' +
            '  <div data-page="dynamic-content" class="page">' +
            '    <!-- Scrollable page content-->' +
            '    <div class="page-content">' +
            '      <div class="content-block">' +
            '<img style="width: 100%" src="'+plate.food.banner+'">' +
            '<p>'+ plate.food.descripcion+'</p>' +
            tags.join("")+
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>'
        );
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
                "<div class='item-title'>"+val.food.nombre+"</div>";

                item +="</div>"+
                "<div class='item-text'>"+val.food.descripcion+"</div>"+
                "</div></a>"+
                "</li>";
            items.push(item);
        });
        $("<ul/>",{ "class":"mylist",html:items.join("")}).appendTo(".media-list");
    });
});


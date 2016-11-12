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


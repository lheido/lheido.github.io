// dev.js
var prefixedTransform = Modernizr.prefixed('transform'),
    currentPage = "#home",
    androidProjectsPage = document.querySelector("#android-projects"),
    webProjectsPage = document.querySelector("#web-projects"),
    navItems = document.querySelectorAll("header nav ul li a");

function translateX(elt, offset) {
    var translate = "translateX("+offset+")";
    if (Modernizr.csstransforms3d){
        translate = "translate3d("+offset+", 0, 0)";
    }
    elt.style[prefixedTransform] = translate;
}

function isSmallScreen() {
    // menu on left == small screen.
    return document.querySelector("header").clientWidth != window.innerWidth;
}

function selectPage(page) {
    if (page == "#home") {
        translateX(androidProjectsPage, "80%");
        translateX(webProjectsPage, "90%");
    } else if (page == "#android-projects") {
        translateX(androidProjectsPage, "10%");
        translateX(webProjectsPage, "90%");
    } else if (page == "#web-projects") {
        translateX(androidProjectsPage, "80%");
        translateX(webProjectsPage, "10%");
    }
}

for (var i = 0; i < navItems.length; i++) {
    //add onclick event
    navItems[i].addEventListener("click", function(event) {
        if (!isSmallScreen()) {
            selectPage(this.hash);
            currentPage = this.hash; // save current selected page.
            event.preventDefault();
            return false;
        }
    }, false);
}

// le fait de faire appel à translate via js casse les mediaqueries (insertion en ligne du style)...
var resizeTimer = 0;
window.onresize = function() {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function(){
        // call only at the end of onresize.
        if (isSmallScreen()) {
            translateX(androidProjectsPage, "0%");
            translateX(webProjectsPage, "0%");
            document.querySelector(currentPage).scrollIntoView();
        } else {
            selectPage(currentPage);
        }
    }, 100);
}

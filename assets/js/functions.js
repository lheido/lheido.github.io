//function.js
function xyzOr3d(x, y, z) {
    if (typeof(x) === 'undefined') x = 0;
    if (typeof(y) === 'undefined') y = 0;
    if (typeof(z) === 'undefined') z = 0;
    return (Modernizr.csstransforms3d) ? "translate3d("+x+", "+y+", "+z+")" : "translateX("+x+", "+y+")";
}

function translateX(elt, offset) {
    elt.style[prefixedTransform] = xyzOr3d(offset);
}

function toArrow(){
    burgerTop.style[prefixedTransform] = "rotate(25deg) "+xyzOr3d("10px", "1px");
    burgerBottom.style[prefixedTransform] = "rotate(-25deg) "+xyzOr3d("10px", "-1px");
    burgerTop.style.width = burgerBottom.style.width = "40%";
}

function toBurger(){
    burgerTop.style[prefixedTransform] = "rotate(0deg) "+xyzOr3d();
    burgerBottom.style[prefixedTransform] = "rotate(0deg) "+xyzOr3d();
    burgerTop.style.width = burgerBottom.style.width = "50%";
}

function rotate(elt, deg) {
    elt.style[prefixedTransform] = "rotate("+deg+"deg)";
}

function isSmallScreen() {
    // menu on left == small screen.
    return document.querySelector("header").clientWidth != window.innerWidth;
}

function selectPage(page) {
    if (!isSmallScreen()) {
        if (page == "#home") {
            translateX(androidProjectsPage, androidProjectsPage.translateMax+"%");
            translateX(androidProjectsPageContent, "50%");
            translateX(webProjectsPage, webProjectsPage.translateMax+"%");
            translateX(webProjectsPageContent, "50%");
        } else if (page == "#android-projects") {
            translateX(androidProjectsPage, androidProjectsPage.translateMin+"%");
            translateX(androidProjectsPageContent, "0%");
            translateX(webProjectsPage, webProjectsPage.translateMax+"%");
            translateX(webProjectsPageContent, "50%");
        } else if (page == "#web-projects") {
            translateX(androidProjectsPage, androidProjectsPage.translateMax+"%");
            translateX(androidProjectsPageContent, "50%");
            translateX(webProjectsPage, webProjectsPage.translateMin+"%");
            translateX(webProjectsPageContent, "0%");
        }
    } else {
        document.querySelector(page).scrollIntoView();
    }
    currentPage = page; // save current selected page.
}

function initHammerEvent(elt) {
    // Hammerjs event
    new Hammer(elt, {drag_min_distance: 10})
        .on("panstart", function(event){
            elt.style[prefixedTransitionDuration] = "0s";
        })
        .on("panleft", function(event){
            if (!isSmallScreen()) {
                if (currentPage == "#"+elt.id){
                    elt.pos = (window.innerWidth - (window.innerWidth * (100- elt.translateMin) / 100)) + event.deltaX;
                } else {
                    elt.pos = (window.innerWidth - (window.innerWidth * (100- elt.translateMax) / 100)) + event.deltaX;
                }
                translateX(elt, elt.pos+"px");
            }
        })
        .on("panright", function(event){
            if (!isSmallScreen()) {
                if (currentPage == "#"+elt.id){
                    elt.pos = (window.innerWidth - (window.innerWidth * (100- elt.translateMin) / 100)) + event.deltaX;
                } else {
                    elt.pos = (window.innerWidth - (window.innerWidth * (100- elt.translateMax) / 100)) + event.deltaX;
                }
                translateX(elt, elt.pos+"px");
            }
        })
        .on("panend", function(event){
            elt.style[prefixedTransitionDuration] = "300ms";
            if (!isSmallScreen()) {
                if (elt.pos > window.innerWidth / 2) {
                    selectPage((currentPage == "#"+elt.id) ? "#home" : currentPage);
                } else {
                    selectPage("#"+elt.id);
                }
            }
        });
}

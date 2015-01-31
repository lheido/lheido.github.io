// dev.js
var prefixedTransform = Modernizr.prefixed('transform'),
    currentPage = "#home",
    androidProjectsPage = document.querySelector("#android-projects"),
    androidProjectsPageContent = document.querySelector("#android-projects .content"),
    webProjectsPage = document.querySelector("#web-projects"),
    webProjectsPageContent = document.querySelector("#web-projects .content"),
    toggleNav = document.querySelector("#toggle-nav"),
    menu = document.querySelector("header"),
    burger = document.querySelector("#burger-wrapper"),
    burgerTop = document.querySelector(".burger:nth-child(1)"),
    burgerBottom = document.querySelector(".burger:nth-child(3)"),
    navItems = document.querySelectorAll("header nav ul li a");

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
            translateX(androidProjectsPage, "80%");
            translateX(androidProjectsPageContent, "50%");
            translateX(webProjectsPage, "90%");
            translateX(webProjectsPageContent, "50%");
        } else if (page == "#android-projects") {
            translateX(androidProjectsPage, "10%");
            translateX(androidProjectsPageContent, "0%");
            translateX(webProjectsPage, "90%");
            translateX(webProjectsPageContent, "50%");
        } else if (page == "#web-projects") {
            translateX(androidProjectsPage, "80%");
            translateX(androidProjectsPageContent, "50%");
            translateX(webProjectsPage, "10%");
            translateX(webProjectsPageContent, "0%");
        }
    } else {
        document.querySelector(page).scrollIntoView();
    }
    currentPage = page; // save current selected page.
}

//add onclick event on each menu items
for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", function(event) {
        selectPage(this.hash);
        for (var j = 0; j < navItems.length; j++)
            navItems[j].classList.remove("ripple");
        this.classList.add("ripple");
        // on enlève la class ripple avec un timer pour pouvoir la rejouer plus tard.
        if (this.timer) clearTimeout(this.timer);
        item = this;
        this.timer = setTimeout(function(){
            item.classList.remove("ripple");
        }, 800);
        event.preventDefault();
        return false;
    }, false);
}

//init some variables
menu.isVisible = false;
burger.nextRotate = 180;
//add on click event on toggleNav
toggleNav.addEventListener("click", function(event){
    if (isSmallScreen()) {
        if (menu.isVisible) {
            translateX(menu, "-"+menu.clientWidth+"px");
            rotate(burger, burger.nextRotate);
            toBurger();
        } else {
            translateX(menu, "0px");
            rotate(burger, burger.nextRotate);
            toArrow();
        }
        burger.nextRotate += 180;
        menu.isVisible = ! menu.isVisible;
    }
    event.stopPropagation();
    return false;
}, false);

//add on click event on header if isSmallScreen
menu.addEventListener("click", function(event){
    if (isSmallScreen()) {
        if (menu.isVisible) {
            translateX(menu, "-"+menu.clientWidth+"px");
            rotate(burger, burger.nextRotate);
            toBurger();
            burger.nextRotate += 180;
            menu.isVisible = false;
        }
        return false;
    }
}, false);


// le fait de faire appel à translate via js casse les mediaqueries (insertion en ligne du style)...
var resizeTimer = 0;
window.onresize = function() {
    if (resizeTimer) {
        clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function(){
        // call only at the end of onresize.
        if (isSmallScreen()) {
            if (menu.isVisible) {
                translateX(menu, "0px");
            } else {
                translateX(menu, "-"+menu.clientWidth+"px");
            }
            translateX(androidProjectsPage, "0%");
            translateX(androidProjectsPageContent, "0%");
            translateX(webProjectsPage, "0%");
            translateX(webProjectsPageContent, "0%");
            document.querySelector(currentPage).scrollIntoView();
        } else {
            translateX(menu, "0px");
            selectPage(currentPage);
        }
    }, 100);
}

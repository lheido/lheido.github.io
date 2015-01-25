// hammerjs concat.
//modernizr concat


var prefixedTransform = Modernizr.prefixed('transform');

function translateX(elt, offset) {
    var translate = "translateX("+offset+")";
    if (Modernizr.csstransforms3d){
        translate = "translate3d("+offset+", 0, 0)";
    }
    elt.style[prefixedTransform] = translate;
}

function isSmallScreen() {
    // si le menu est sur la gauche == petit écran.
    return document.querySelector("header").clientWidth != window.innerWidth;
}

var androidProjectsPage = document.querySelector("#android-projects"),
    webProjectsPage = document.querySelector("#web-projects"),
    navItems = document.querySelectorAll("header nav ul li a");

for (var i = 0; i < navItems.length; i++) {
    //on ajoute un onclick event
    navItems[i].addEventListener("click", function(event){
        if(!isSmallScreen()){
            if (this.hash == "#home") {
                translateX(androidProjectsPage, "80%");
                translateX(webProjectsPage, "90%");
            } else if (this.hash == "#android-projects") {
                translateX(androidProjectsPage, "10%");
                translateX(webProjectsPage, "90%");
            } else if (this.hash == "#web-projects") {
                translateX(androidProjectsPage, "80%");
                translateX(webProjectsPage, "10%");
            }
            event.preventDefault();
            return false;
        }
    }, false);
}

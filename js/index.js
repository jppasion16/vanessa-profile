/**
 * LISTENERS
 */
window.addEventListener("load", () => {
    // for header
    const iconBurger = document.getElementById("iconBurger");
    if (iconBurger !== null) {
        const dataToggleID = iconBurger.getAttribute("data-toggle");
        const navList = document.getElementById(dataToggleID);
        const navAnchors = document.querySelectorAll(`#${dataToggleID} a`);
        const classToggle = "nav-active";

        iconBurger.addEventListener("click", () => {
            if (navList.classList.contains(classToggle)) {
                navList.classList.remove(classToggle);
                iconBurger.classList.remove(classToggle);
                enableScroll();
            }
            else {
                navList.classList.add(classToggle);
                iconBurger.classList.add(classToggle);
                disableScroll();
            }
        });

        navAnchors.forEach(navAnchor => {
            navAnchor.addEventListener("click", () => {
                navList.classList.remove(classToggle);
                iconBurger.classList.remove(classToggle);
                enableScroll();
            });
        });
    }

    // scroll top
    const pageHeader = document.getElementById("pageHeader");
    window.addEventListener("scroll", () => {
        if (window.scrollY != 0 && !pageHeader.classList.contains("shrink")) {
            pageHeader.classList.add("shrink");
        }
        else if (window.scrollY == 0) {
            pageHeader.classList.remove("shrink");
        }
    });
});

/**
 * SCROLLING
 */

function scrollToId(elemId = "pageHeader") {
    elem = document.getElementById(elemId);
    if (elem !== undefined || elem !== null) elem.scrollIntoView();
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
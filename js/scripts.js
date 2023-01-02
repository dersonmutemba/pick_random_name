/** @param names array containing inserted names */
var names = [];

var textboxname = document.getElementById("name");
var selectbutton = document.getElementById("select-button");
var selectcontainer = document.getElementById("random-name-selection-container");
var inputcontainer = document.getElementById("text-input-container");
var display = document.getElementById("display-name");

textboxname.focus();

/** @param oldScrollY variable that stores the value of scrollY in a given instance. It is used to control the direction of the scroll. */
var oldScrollY = window.scrollY;

window.onscroll = function(event) {
    if(oldScrollY < window.scrollY) {
        scrolltodisplay();
    }
    oldScrollY = window.scrollY;
}

textboxname.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        names.push(textboxname.value);
        textboxname.value = "";
        document.body.style.overflow = "visible";
    }
});

textboxname.addEventListener("keyup", function(event) {
    if(event.key === "ArrowDown") {
        event.preventDefault();
        if(names.length > 0)
            scrolltodisplay();
    }
})

var arrowupevent = function(event) {
    if(event.key === "ArrowUp")
        scrolltoinput();
};

selectbutton.addEventListener("keyup", arrowupevent);
selectcontainer.addEventListener("keyup", arrowupevent);

/** Scrolls to the div where random names are displayed */
function scrolltodisplay() {
    selectcontainer.scrollIntoView();
    selectbutton.focus();
    document.body.style.overflow = "hidden";
}

/** Scrolls to the div where insertion is made */
async function scrolltoinput() {
    inputcontainer.scrollIntoView();
    document.body.style.overflow = "visible";
    await new Promise(resolve => setTimeout(resolve, 1000));
    textboxname.focus();
}

/** Returns a random integer between 0 and limit
 * @param limit an integer that stores the upper limit
 */
function randomInteger(limit) {
    return Math.trunc(Math.random()*limit);
}

/** Returns a random name from list names */
function randomName() {
    return names[randomInteger(names.length)];
}

/** Show the randomly selected name to the user */
async function showRandomName() {
    hideElements();
    display.innerHTML = randomName();
    await new Promise(resolve => setTimeout(resolve, 3000));
    restoreElements();
}

/** Hide the elements of the display screen */
function hideElements() {
    selectbutton.style.display = "none";
}

/** Restore the elements of the display screen */
function restoreElements() {
    display.innerHTML = "";
    selectbutton.style.display = "inline-block";
    selectbutton.focus();
}
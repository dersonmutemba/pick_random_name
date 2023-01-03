/** @param names array containing inserted names */
var names = [];

/** @param mustRemove logical value for removing names in the array */
var mustRemove = false;

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
    let name = names[randomInteger(names.length)];
    if(mustRemove) {
        names = removeElementAt(names.indexOf(name), names);
    }
    return name;
}

/** Show the randomly selected name to the user */
async function showRandomName() {
    hideElements();
    display.innerHTML = randomName();
    await new Promise(resolve => setTimeout(resolve, 3000));
    if(listEmpty()) {
        scrolltoinput();
    }
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

/** Verify if the names list is empty */
function listEmpty() {
    return names.length == 0;
}

/** Control the remove toggle */
function toggleRemove() {
    var toggle = document.getElementById("switch-option-1");
    var switchToggle = document.getElementById("switch-toggle-option-1");
    if(mustRemove) {
        toggle.style.backgroundColor = "#929292";
        switchToggle.style.transform = "translateX(0)";
    } else {
        toggle.style.backgroundColor = "transparent";
        switchToggle.style.transform = "translateX(15px)";
    }
    mustRemove = !mustRemove;
}

/** Control the ckeckbox */
function checkRemove() {
    toggleRemove();
    var check = document.getElementById("option-1");
    if(mustRemove) {
        check.checked = "true";
    }
    else {
        check.checked = "false";
    }
}

/** Remove a value in the array in a given index and return the new array
 * @param index index which represents the position of the value that must be removed
 * @param array array from which data will be removed
 */
function removeElementAt(index, array) {
    var values = [];
    for(var i = 0; i < array.length; i++) {
        if(i != index) {
            values.push(array[i]);
        }
    }
    return values;
}
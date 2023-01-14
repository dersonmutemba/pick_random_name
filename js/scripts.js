/** @param names array containing inserted names */
var names = [];

/** @param mustRemove logical value for removing names in the array */
var mustRemove = false;

var textboxname = document.getElementById("name");
var selectbutton = document.getElementById("select-button");
var selectcontainer = document.getElementById("random-name-selection-container");
var inputcontainer = document.getElementById("text-input-container");
var display = document.getElementById("display-name");
var displayduration = 3;

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
        if(textboxname.value.trim() != "") {
            names.push(textboxname.value);
            textboxname.value = "";
            document.body.style.overflow = "visible";
            if(names.length == 2) {
                controlGoToDisplayMessage();
            }
        }
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
    hideGoToDisplayMessage();
    controlGoToInputMessage();
}

/** Scrolls to the div where insertion is made */
async function scrolltoinput() {
    inputcontainer.scrollIntoView();
    if(names.length != 0)
        document.body.style.overflow = "visible";
    await new Promise(resolve => setTimeout(resolve, 1000));
    textboxname.focus();
    hideGoToInputMessage();
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
    if(names.length != 1)
        await animateNameSelection();
    display.innerHTML = randomName();
    showDurationIndicator();
    await new Promise(resolve => setTimeout(resolve, displayduration*1000));
    hideDurationIndicator();
    if(listEmpty()) {
        scrolltoinput();
    }
    restoreElements();
}

/** Hide the elements of the display screen */
function hideElements() {
    selectbutton.style.display = "none";
}

/** Make an effect for name reveal */
async function animateNameSelection() {
    let timeLimit = 1000;
    let timeInterval = 50;
    let timeNow = 0;
    let namePosition = 0;
    let sizeNow = 160;
    let sizeLimit = 80;
    let sizeDecrement = (sizeNow - sizeLimit)/(timeLimit/timeInterval);
    while (timeNow < timeLimit) {
        display.style.fontSize = sizeNow + "px";
        display.innerHTML = names[namePosition++ % names.length];
        await new Promise(resolve => setTimeout(resolve, timeInterval));
        timeNow += timeInterval;
        sizeNow -= sizeDecrement;
    }
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
        toggle.style.backgroundColor = "var(--deactivated-color)";
        switchToggle.style.transform = "translateX(0)";
    } else {
        toggle.style.backgroundColor = "var(--activated-color)";
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

/** Show the message to the user to go to the display screen */
function showGoToDisplayMessage() {
    var messenger = document.getElementById("messenger");
    messenger.innerHTML = "Clique em <span class=\"messenger-highlight messenger-rounder-border\">&DownArrow;</span> ou deslize o mouse para prosseguir";
    messenger.style.transition = "transform .125s ease-out, opacity .1s none"
    messenger.style.opacity =  "1";
    messenger.style.transform = "translateY(-40px)";
}

/** Hide the message to the user to go to the display screen */
function hideGoToDisplayMessage() {
    var messenger = document.getElementById("messenger");
    messenger.style.transition = "transform .125s ease-out, opacity 1s linear";
    messenger.style.transform = "translateY(0)";
}

/** Controls the message to the user to go to the display screen */
async function controlGoToDisplayMessage() {
    showGoToDisplayMessage();
    await new Promise(resolve => setTimeout(resolve, 10000));
    hideGoToDisplayMessage();
}

/** Show the message to the user to go to the input screen */
function showGoToInputMessage() {
    var messenger = document.getElementById("messenger");
    messenger.innerHTML = "Clique em <span class=\"messenger-highlight messenger-rounder-border\">&UpArrow;</span> para inserir nomes novamente";
    messenger.style.transition = "transform .125s ease-out, opacity .1s none"
    messenger.style.opacity =  "1";
    messenger.style.transform = "translateY(-40px)";
}

/** Hide the message to the user to go to the input screen */
function hideGoToInputMessage() {
    var messenger = document.getElementById("messenger");
    messenger.style.transition = "transform .125s ease-out, opacity 1s linear";
    messenger.style.transform = "translateY(0)";
}

/** Controls the message to the user to go to the input screen */
async function controlGoToInputMessage() {
    await new Promise(resolve => setTimeout(resolve, 4000));
    showGoToInputMessage();
    await new Promise(resolve => setTimeout(resolve, 10000));
    hideGoToInputMessage();
}

/** Makes the duration indicator visible */
function showDurationIndicator() {
    var durationindicator = document.getElementById("display-duration");
    durationindicator.style.opacity = "1";
    var treading = document.getElementById("display-duration-treading");
    treading.style.transition = "width " + displayduration + "s cubic-bezier(0, 0, 0, 0.8)";
    treading.style.width = "0";
    treading.style.width = "100%";
}

/** Hides the duration indicator */
function hideDurationIndicator() {
    var durationindicator = document.getElementById("display-duration");
    durationindicator.style.opacity = "0";
    var treading = document.getElementById("display-duration-treading");
    treading.style.width = "0";
}

function switchThemeMode() {
    var darkmodecheckbox = document.getElementById("option-2");
    var lightmode = document.getElementById("svg-light-mode");
    var darkmode = document.getElementById("svg-dark-mode");
    var root = document.querySelector(":root");
    if(darkmodecheckbox.checked) {
        lightmode.style.display = "block";
        darkmode.style.display = "none";
        root.style.setProperty("--background-color", "#000");
        root.style.setProperty("--foreground-color", "#fff");
    } else {
        darkmode.style.display = "block";
        lightmode.style.display = "none";
        root.style.setProperty("--background-color", "#fff");
        root.style.setProperty("--foreground-color", "#000");
    }
}
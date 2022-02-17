// When the #grayButton is clicked, the color scheme of the page should change to more of a "dark mode" feel, with gray backgrounds and white text throughout.
// The #whiteButton should bring things back to the "light mode" color scheme with white backgrounds and dark text
// Try to do this by setting styles (.style)
// Remember to try one step at a time, testing each stage as you go!

// Try making the traffic light work - Think through the problem BEFORE you code!
// You'll use addEventListener and getElementById if you're doing it right...

// Reset function that turns all lights off
function turnOff(){
    document.querySelector("#stopLight").classList.remove("stop");
    document.querySelector("#slowLight").classList.remove("caution");
    document.querySelector("#goLight").classList.remove("go");
}


// Green
function go(){

    // Turn everything off
    turnOff();

    // Turn green on
    document.querySelector("#goLight").classList.add("go");

}
// Red
function stop(){
    // Turn everything off
    turnOff();

    // Turn red on
    document.querySelector("#stopLight").classList.add("stop");

}


// Yellow
function caution(){
    // Turn everything off
    turnOff();
    // Turn yellow on
    document.querySelector("#slowLight").classList.add("caution");
}



// Bind to red
document.getElementById('stopButton').addEventListener('click',stop);

// Bind to green
document.getElementById('goButton').addEventListener('click',go);

// Bind to yellow
document.getElementById('slowButton').addEventListener('click',caution);
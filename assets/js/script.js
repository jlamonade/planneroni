// DEPENDENCIES
var containerEl = $(".container")
var buttonEls = $("button")

// STARTING VALUES
var currentDate = new Date().getDate();
var currentTime = new Date().getHours();
var events = [];

// FUNCTIONS
function renderTimeBlock() {
    for (var i = 9; i < 18; i++) {
        // CREATE
        var timeBlockEl = $("<div class='time-block row'>").attr("data-hour", i)
        var hourColEl = $("<div class='hour col-2'>").text(timeBlockEl.attr("data-hour"))
        var textareaColEl = $("<textarea class='textarea col-8'>")
        var saveBtnEl = $("<button class='saveBtn col-2'>")
        timeBlockEl.append(hourColEl).append(textareaColEl).append(saveBtnEl)
        // BUILD
        containerEl.append(timeBlockEl)
    }
}

function checkIfEventPassed() {

}

renderTimeBlock()
// render row elements
    // check if events exist in localstorage
        // if they exist populate to corresponding row elements
        // render row elements from 9a to 5p

// USER INTERACTIONS

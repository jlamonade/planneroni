// DEPENDENCIES
var containerEl = $(".container");
var buttonEls = $("button");
var currentDayEl = $("#currentDay");

// STARTING VALUES
var currentDate = moment().format("dddd, MMMM Do YYYY");
var currentTime = new Date().getHours();
var dateStamp = moment().format("MMDDYY"); // used to make sure events are from same date
var events = localStorage.getItem(dateStamp) // check if events exist in localstorage
  ? JSON.parse(localStorage.getItem(dateStamp))
  : [];

// FUNCTIONS
function renderTimeBlock() {
  // render row elements
  for (var i = 9; i < 18; i++) { // render row elements from 9a to 5p
    // CREATE
    var timeBlockEl = $("<div class='time-block row'>").attr("data-hour", i);
    var hourColEl = $("<div class='hour col-2'>").text(
      timeBlockEl.attr("data-hour")
    );
    var textareaColEl = $("<textarea class='textarea col-8'>");
    var saveBtnEl = $("<button class='saveBtn col-2'>");
    // BUILD
    timeBlockEl.append(hourColEl).append(textareaColEl).append(saveBtnEl);
    containerEl.append(timeBlockEl);
  }
  checkIfEventPassed();
}

function checkIfEventPassed() {
  var timeBlocksEls = containerEl.children();
  for (var i = 0; i < timeBlocksEls.length; i++) {
    var timeBlockHour = timeBlocksEls.eq(i).attr("data-hour");
    if (timeBlockHour > currentTime) {
      timeBlocksEls.eq(i).addClass("future");
    } else if (timeBlockHour < currentTime) {
      timeBlocksEls.eq(i).addClass("past");
    } else {
      timeBlocksEls.eq(i).addClass("present");
    }
  }
}

function renderCurrentDate() {
  currentDayEl.text(`Today is ${new Date().toDateString()}`);
}

function saveEventToArray(event) {
  var eventText = $(event.target).parent().children("textarea").val();
  var eventIndex = $(event.target).parent().attr("data-hour");
  events[eventIndex - 9] = eventText;
}

function saveArrayToLocalStorage() {
  localStorage.setItem(dateStamp, JSON.stringify(events));
  console.log(localStorage.getItem(dateStamp));
}

function populateTimeBlocksFromArray() {
  for (var i = 0; i < 10; i++) { 
    if (events[i]) { // if events exist, populate to time-block
      $(".time-block").eq(i).children("textarea").val(events[i]);
    }
  }
}

function handleSaveBtnClick(event) {
  saveEventToArray(event);
  saveArrayToLocalStorage();
}

// console.log(events)

renderCurrentDate();
renderTimeBlock();
populateTimeBlocksFromArray();




// USER INTERACTIONS
$("button").click(handleSaveBtnClick);

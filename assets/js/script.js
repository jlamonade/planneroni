// DEPENDENCIES
var containerEl = $(".container");
var buttonEls = $("button");
var currentDayEl = $("#currentDay");

// STARTING VALUES
var currentDate = moment().format("dddd, MMMM Do YYYY");
var currentTime = +moment().format("HH");
var dateStamp = moment().format("MMDDYY"); // used to make sure events are from same date
var events = localStorage.getItem(dateStamp)
  ? JSON.parse(localStorage.getItem(dateStamp))
  : []; // only takes events from localStorage for the date they were created for

// FUNCTIONS
function renderTimeBlock() {
  // render row elements
  $(".container").children().remove();
  for (var i = 9; i < 18; i++) {
    // render row elements from 9a to 5p
    // CREATE
    var timeBlockEl = $("<div class='time-block row'>").attr("data-hour", i);
    var hourColEl = $("<div class='hour col-2'>").text(
      moment(timeBlockEl.attr("data-hour"), "h").format("ha")
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
  // changes the bgcolor of textarea according to time of day
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
  currentDayEl.text(`Today is ${currentDate}`);
}

function saveEventToArray(event) {
  // adds event to the corresponding hour/index in the array
  var eventText = $(event.target).parent().children("textarea").val();
  var eventIndex = $(event.target).parent().attr("data-hour");
  // first hour is 9 so to convert time to index you must take away 9
  events[eventIndex - 9] = eventText;
}

function saveArrayToLocalStorage() {
  localStorage.setItem(dateStamp, JSON.stringify(events));
  console.log(localStorage.getItem(dateStamp));
}

function populateTimeBlocksFromArray() {
  for (var i = 0; i < 10; i++) {
    if (events[i]) {
      // if events exist, populate to time-block
      $(".time-block").eq(i).children("textarea").val(events[i]);
    }
  }
}

function handleSaveBtnClick(event) {
  saveEventToArray(event);
  saveArrayToLocalStorage();
}

// INIT

renderCurrentDate();
renderTimeBlock();
populateTimeBlocksFromArray();
renderCurrentDate();
renderTimeBlock();
populateTimeBlocksFromArray();
$("button").click(handleSaveBtnClick);

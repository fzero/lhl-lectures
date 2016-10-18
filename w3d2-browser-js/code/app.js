// Magic happens here

// You don't need jQuery! If you don't like typing `document.querySelector`
// all the time, you can use the Lazy Dev's jQuery™
function $(query) {
  return document.querySelector(query);
}

function $$(query) {
  return document.querySelectorAll(query);
}

// I like prefixing variables containing DOM elements with `$`
// to differentiate them from regular data.
var $button = $('#the-button');

function buttonClick(ev) {
  ev.stopPropagation(); // Stops event from propagating outwards
  alert("You clicked meeeee!");
  $('#main-header').innerText = "YOU CLICKED THE BUTTON";
}

$button.addEventListener('click', buttonClick);


$('#inner-box').addEventListener('click', function(ev) {
  ev.stopPropagation();
  alert("inner-box clicked!");
});

$('#middle-box').addEventListener('click', function(ev) {
  ev.stopPropagation();
  alert("middle-box clicked!");
});

$('#outer-box').addEventListener('click', function(ev) {
  ev.stopPropagation();
  alert("outer-box clicked!");
});


$('#soundcloud').addEventListener('click', function(ev){
  ev.preventDefault(); // Stops the default action from happening - opening
  alert("LOL NOPE");   // a link in this case.
});

$('#the_form').addEventListener('submit', function(ev) {
  ev.preventDefault(); // Same here - don't actually submit the form
  var name = $('#name').value;
  var quest = $('#quest').value;
  console.log("Name is " + name + ", quest is " + quest);
});

// Logs the `mousemove` event to the console every time the mouse is moved
// document.addEventListener('mousemove', function(ev) {
//   console.log(ev);
// });

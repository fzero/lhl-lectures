// Magic happens here

// You don't need jQuery! If you don't like typing `document.querySelector`
// all the time, you can use the Lazy Dev's jQuery™
function $(query) {
  return document.querySelector(query);
}

function $$(query) {
  return document.querySelectorAll(query);
}


// Now we get all the elements that matter to us
var $button = $('#button'); // same as document.querySelector('#button')
var $innerest = $('#innerest');
var $inner = $('#inner');
var $outer = $('#outer');
var $unclickable = $('#unclickable');

// These are for the char counter
var $someText = $('#someText');
var $counter = $('#counter');

// `input` is fired every time the text field receives an input
$someText.addEventListener('input', function(ev) {
  $counter.innerText = this.value.length;
  // I could also use `ev.target` here:
  // $counter.innerText = ev.target.value.length;
});


// Use event.preventDefault() to prevent the default action.
// In this case it would be opening a link.
$unclickable.addEventListener('click', function(ev){
  ev.preventDefault();
})


// I can separate the event callback on its own function
function btnClick(ev){
  alert('Button clicked');
  ev.stopPropagation();
}
$button.addEventListener('click', btnClick);

// Or I can just pass an anonymous function as a callback (of course)
$innerest.addEventListener('click', function(ev){
  alert('Innermost div clicked');
  ev.stopPropagation();
});

$inner.addEventListener('click', function(ev){
  alert('Inner div clicked');
  ev.stopPropagation(); // Prevents an event from bubbling outwards.
});

$outer.addEventListener('click', function(ev){
  alert('Outer div clicked');
  ev.stopPropagation();
});


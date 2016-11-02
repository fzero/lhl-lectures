// Poor person's jQuery
function $(query) {
  return document.querySelector(query);
}

function $$(query) {
  return document.querySelectorAll(query);
}

$('#typehere').addEventListener('input', function(ev) {
  console.log("Some typing going on:", ev.target.value);
});

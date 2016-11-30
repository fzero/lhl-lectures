// Poor person's jQuery
function $(query) {
  return document.querySelector(query);
}

$('#typehere').addEventListener('input', function(ev) {
  console.log("Some typing going on:", ev.target.value);
});

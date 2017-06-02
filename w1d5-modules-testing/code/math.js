// A module with some math functions

function squared(number) {
  return number * number;
}

function circleArea(radius, precision) {
  var result = Math.PI * squared(radius);
  return roundToPrecision(result, precision);
}

function circumference(radius, precision) {
  var result = 2 * Math.PI * radius;
  return roundToPrecision(result, precision);
}

function toKb(bytes, precision) {
  return roundToPrecision(bytes/1024, precision);
}

function triangleArea(w, h, precision) {
  return roundToPrecision((w * h) / 2, precision);
}

// Internal utility function (not exported)
function roundToPrecision(number, precision) {
  var precision = precision || 2; // default precision
  return Number(number.toFixed(precision));
}

module.exports = {
  squared: squared,
  circleArea: circleArea,
  circumference: circumference,
  toKb: toKb,
  triangleArea: triangleArea
}

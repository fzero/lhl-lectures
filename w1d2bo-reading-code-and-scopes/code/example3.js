function add(x) {
  var z = 10;
  return function(y) {
    return x + y + z;
  }
}

var first = add(5);

var second = first(5);

console.log(second);


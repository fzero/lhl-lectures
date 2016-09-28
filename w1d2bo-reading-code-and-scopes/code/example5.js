function doStuff(value, cb) {
  console.log("Inside of doStuff", value);

  cb(value);
}

doStuff(10, function(x) { console.log(x * 2); });
doStuff("Apple", function(x) { console.log("I like " + x); });
doStuff([1, 2, 3], function(x) { x.map(function(y) { console.log(y); }); });
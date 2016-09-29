try {
  // setTimeout(function() { throw "tooEarlyException"; }, 2000);
  throw "tooEarlyException";
}
catch (e) {
  console.log("ERROR:", e);
}

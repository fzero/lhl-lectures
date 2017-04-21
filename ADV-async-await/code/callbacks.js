/////////
// Callback approach
/////////

const delayCall = (shouldSucceed, successCb, errorCb) => {
  if (shouldSucceed) {
    setTimeout(() => successCb("It's a success!"), 1000)
  }
  else {
    setTimeout(() => errorCb("FAIL"), 1000)
  }
}

// Successful call
delayCall(
  true,
  (result) => console.log(result),
  (error) => console.error(error)
)

// Failed call
delayCall(
  false,
  (result) => console.log(result),
  (error) => console.error(error)
)

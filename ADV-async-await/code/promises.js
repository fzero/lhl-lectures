/////////
// Promises approach
/////////

const delayCall = (shouldSucceed) => {
  return new Promise((resolve, reject) => {
    if (shouldSucceed) {
      setTimeout(() => resolve("It's a success!"), 1000)
    }
    else {
      setTimeout(() => reject("FAIL"), 1000)
    }
  })
}

// Successful call
delayCall(true)
.then(console.log)
.catch(console.error)

// Failed call
delayCall(false)
.then(console.log)
.catch(console.error)

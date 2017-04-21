/////////
// Async/await approach
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

// To use await we need to be inside an async function,
// so we're creating an IIFE here.
(async function() {

  // Successful call
  let result1 = await delayCall(true)
  console.log('Success #1!', result1)

  try {
    // Failed call
    let result2 = await delayCall(false)
    console.log('Success #2!', result2) // Skipped!
  }
  catch (err) {
    console.error('Oh no!', err)
  }

})()

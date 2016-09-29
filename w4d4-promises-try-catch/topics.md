# Topics

* `try` / `catch` and control flow with errors
  * Only works with synchronous code
  * Which makes it kinda useless most of the time
  * Because of that, the `callback(err, result)` pattern became prevalent
* Dealing with errors in async code
  * Yep, it's callbacks
  * The most common pattern in JS are callbacks where the first argument is the error (see above).
* Promises to the rescue

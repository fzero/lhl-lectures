# How do we define production software?

## For the user

### It works (as in: it doesn't crash)

  * Redundant application servers
  * Redundant database servers
  * Quality Assurance step
    * Automated tests (ideally)
    * Manual testing

### It's fast

  * Your app should be functional in less than 3s ideally
  * Time and bandwidth as budget
    * Ideally, your framework shouldn't use more than 60% of your budget
    * Good resource: [Ilya Grigorik's Youtube course on web performance](https://www.youtube.com/watch?v=7gtf47D_bu0&list=PLS3jzvALRSe6uP9gVfXLCG6nWo7M0hAJY)
    * Good people to follow on Twitter:
      * [Ilya Grigorik (@igrigorik)](https://twitter.com/igrigorik)
      * [Paul Lews (@aerotwist)](https://twitter.com/aerotwist)
      * [Paul Irish (@paul_irish)](https://twitter.com/paul_irish)
      * [Jake Archibald (@jaffathecake)](https://twitter.com/jaffathecake)
      * [Kevin Sweeney (@restlessdesign)](https://twitter.com/restlessdesign)

## For the app owner (company, developer etc.)

### It's stable enough (as in: it doesn't crash all the time)

  * Automated tests (or QA, but preferrably automated)
  * It's constantly being refactored
    * New features don't necessarily result in more code
    * Unused code gets removed
    * Code doesn't repeat itself
  * Code is documented
    * If something isn't immediately clear, add comments!
    * Write docmentation files!
      * Add README.md!

### If it _does_ crash, we know what happenned and where
  * Logging!
    * Take care to clean your logging in production
      * Don't leave SQL queries or irrelevant information in there!
    * What to log in production?
      * Errors (500, API timeouts...)
      * Unusual situations and edge cases
      * HTTP Requests (optional, but useful)
    * Where do I store the logs?
      * Use a log aggregator!
        * [Logentries](https://logentries.com/), [Rollbar](https://rollbar.com/) and [NewRelic](https://newrelic.com/) are popular solutions
        * Especially relevant when you have more than one server

### It's easy to add new features

  * Make your code modular
    * Each module should deal with only one thing
    * Modular code is WAY easier to test
      * In JavaScript code that isn't modular isn't testable
  * Consistency
    * Similar things work similarly
    * Errors are dealt with in roughly the same way
    * If necessary write a specification (spec) on how things should behave in general
    * Example spec: [JSON API](http://jsonapi.org/)
  * Again, documentation!

### It's secured

  * You should have trustworthy access control
    * Sadly this means you need to double-check your access controls
      * Get ID from session => always confirm user exists on database
  * Sanitize your inputs
    * Check your form fields on the client
    * Sanitize again on the back-end

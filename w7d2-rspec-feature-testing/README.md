# Feature testing with Rails and RSpec

Today we talked about the differences between unit and integration tests (also known as feature tests) and learned how to do it using [RSpec](https://relishapp.com/rspec/rspec-rails/docs) and [Capybara](http://cheatrags.com/capybara). We've expanded on our Bicycles app example from yesterday.

The code discussed in class can be found inside [`/code`](code). Be sure to check out [`/code/spec/features`](code/spec/features).

I've also included a [Capybara cheatsheet](capybara_cheatsheet.md) with the most common actions.

> **NOTE:** Setting up Capybara can be tricky, and we've run into an issue with `geckodriver` during class. We've switched to `chromedriver` and everything went fine. [Check the README included with the example code](code/README.md) for more details.

## Unit Testing

- Encapsulated, easy to troubleshoot
- Faster to run test than to manually do it
- Regression Testing
  - Make sure new features don't break old ones
- Certify that your code behaves as expected
- Ensure reliability
- Ensure stability

**Disadvantages:**

- Takes time to write the tests
- Changes to original implementation invalidate tests
  - Have to write new tests
- Hard to cover all the edge cases
- Hard to test integrations

## Code coverage

Code coverage is a measure of how much of your code is actually tested.

- Every line of code getting tested
- [RCov](https://github.com/relevance/rcov): Tests code coverage of tests
- Average of 70-80% is considered good, but you should aim as high as possible

## Continuous Integration (CI)

- Testing strategy where code is tested whenever a certain branch is pushed
- Separate server with testing software running on it
- Monitors master branch of a repository (usually)
- Mails out results (and sometimes annoys whoever broke the build via Slack!)

## Continuous Deployment (CD)

- Separate server with testing/monitoring software on it
- Monitors master branch of a repository
- Runs tests when master is updated
  - If tests pass, deploys to production
- Continuous integration PLUS deployment

## Integration Testing

- Testing the overall product
  - How units integrate with each other
- Fake (headless) browser
  - PhantomJS (npm)
  - Selenium
    - Separate piece of software
  - DOM traversal
  - Fill in forms
  - Click on links
- Capybara
- Test for presence for elements / text on the page

Disadvantages:

- Difficult to write tests that fully test a behaviour
- Difficult to write tests that cover edge cases
- TIME
  - Each test has to launch a brand-new browser instance
- When test fails, far more time to troubleshoot
  - Dumping out a lot of HTML for debugging
- More brittle applications are more likely to cause testing problems
- Harder to write specific test cases
- Harder to "hide" business-logic layout on page

## Methods for Integration Testing

- CI/CD
- Manual Testing
  - Sweatshops
  - Skill or bandwidth is unavailable for writing/building tests
  - Expensive

## Acknowledgements

Lecture notes heavily based on Don Burks' original notes.

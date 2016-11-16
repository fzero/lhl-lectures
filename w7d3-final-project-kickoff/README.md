# Final project kickoff

Let's begin with some high-level rules:

## Rule #1

Time is short, so **KISS**!

**K**EEP **I**T **S**TUPID **S**IMPLE

or

**K**EEP **I**T **S**IMPLE, **S**TUPID

(your pick)

## Rule #2

You need to be able to summarize what you want to accomplish in one sentence. Everything else comes after that.

This answers the first question: **WHAT?**

## Rule #3

Don't worry about implementation details at first, but make a list of what you'll need. Use this to break the problem you want to solve into its component parts.

This begins to answer the second question: **HOW?**

While you're doing this, remember **YAGNI**

**Y**ou **A**in't **G**onna **N**eed **I**t

Remove everything that feels optional. Ask yourselves what's the bare minimum for your idea to work. That's your Minimum Viable Product (MVP).

## Alright then, where do we go from here?

In short:

* Take your list of features and make user stories
  + Figure out the data you'll work with
    - Models!
    - Database tables!
    - Relationships!
  + Create workflows on how the users will provide that data and interact with it
    - Wireframes!
    - Storyboards!
    - Tools:
      + https://wireframe.cc
      + https://moqups.com/
  + It's always better to think from the perspective of the user, not what's easier to implement
  + How to write user stories: https://medium.com/@jonatisokon/a-framework-for-user-stories-bc3dc323eca9

## How to work as a team

### Non-technical aspects

* **GIVE YOURSELF MILESTONES**
  - Set due dates
  - Set development targets
  - Meet them!
  - Use Trello: http://trello.com

* **SMART Goals**
  - Specific
  - Measurable
  - Achievable
  - Relevant
  - Time-based

### Technical aspects

* Use git, of course
  - `master` branch should always be _in a working state_
  - Use feature branching
    + A very good tutorial: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
    + Git cheatsheet: http://www.ndpsoftware.com/git-cheatsheet.html
  - Use database migrations and seeds
* Write tests if you can
* Good programmers are lazy
  - There's a Javascript library or npm package for that
    + If you're using an external service, look for a library
  - There's a Ruby gem for that
    + If you're using an external service, look for a gem
  - There's a CSS framework for that
    + You really don't need to reinvent the wheel. There are plenty of UI libraries with ready-made buttons, forms elements, grid systems and so on.

#### Git feature branching cheatsheet

1. Ensure your local `master` is up to date: `git checkout master && git pull origin master`
2. Start your feature branch: `git checkout -b my_feature`
3. _codecodecode_, `git commit`, _codecode_, **goddammit!**, _codecodecode_, `git commit`, YAY!
4. Switch back to `master` and update it again: `git checkout master && git pull origin master`
5. Merge your feature in: `git merge my_feature`
6. Resolve any conflicts (hopefully you don't have any!)
7. Test the updated `master` branch locally
8. `git push origin master`

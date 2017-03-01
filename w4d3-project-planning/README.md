# Project planning (midterm)

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

Don Burks made an amazing list of things to do next:
https://gist.github.com/donburks/9f47f22cc2fb54ac7396

But in short:

* Take your list of features and make user stories
  + Figure out the data you'll work with
    - Schema
      - Database tables!
      - Relationships!
    - Are you sticking with plain DB queries (`pg`/`knex`) or will you try using an ORM?
      - [Bookshelf](http://bookshelfjs.org)
      - [Sequelize](http://sequelizejs.com)
  + Create workflows on how the users will provide that data and interact with it
    - Wireframes!
    - Storyboards!
    - Tools:
      + https://wireframe.cc
      + https://moqups.com/
      + Good ol' whiteboarding
  + It's always better to think from the perspective of the user, not what's easier to implement
  + How to write user stories: https://medium.com/@jonatisokon/a-framework-for-user-stories-bc3dc323eca9

## How to work as a team

### Non-technical aspects

* **GIVE YOURSELF MILESTONES**
  - Set due dates
  - Set development targets
  - MEET THEM
  - USE TRELLO: http://trello.com

* **SMART Goals**
  - **S**pecific
  - **M**easurable
  - **A**chievable
  - **R**elevant
  - **T**ime-based

### Technical aspects

* Use git!
  - `master` should always be _sane_
  - Use feature branching
    + A very good tutorial: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
    + Git cheatsheet: http://www.ndpsoftware.com/git-cheatsheet.html
  - Use database migrations and seeds
* Write tests if you can
  - [`mocha`](http://mochajs.org/) is your friend
* Good programmers are lazy
  - There's a `npm` package for that
    + If you're using an external service, look for a package
  - There's a CSS framework for that
    + [Bootstrap](http://getbootstrap.com/)
    + [Materialize](http://materializecss.com/)
    + Hundreds of others!

#### Git feature branching cheatsheet

1. Ensure your local `master` is up to date: `git checkout master && git pull origin master`
2. Start your feature branch: `git checkout -b my_feature`
3. _codecodecode_, `git commit`, _codecode_, **goddammit!**, _codecodecode_, `git commit`, YAY!
4. Switch back to `master` and update it again: `git checkout master && git pull origin master`
5. Merge your feature in: `git merge my_feature`
6. Resolve any conflicts (hopefully you don't have any!)
7. Test the updated `master` branch locally
8. `git push origin master`

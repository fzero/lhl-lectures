# Gems and Bundler

Bundler is used to manage the gems used in a Ruby project. It references a configuration file called `Gemfile`, which works similarly to the `dependencies` part of `package.json`.

Anytime you see a `Gemfile` in a project, you should run `bundle install`. Bundler will then auto-generate a `Gemfile.lock` file, which contains information on all gem dependencies (similar to the `node_modules` directory). You should **not** edit `Gemfile.lock` manually; it will be generated automatically every time `bundle install` or `bundle update` is executed.

Once this is in place, use the `bundle exec` command to run any ruby files that depend on the gems listed inside your `Gemfile`.

# Intro to ActiveRecord

_ActiveRecord_ is a Ruby gem that implements the _active record_ pattern, providing ways to talk to a database using object oriented programming. It's a very popular gem that's included by default in Ruby on Rails, and it's one of the main reasons for its success.

The documentation on ActiveRecord (the gem) is extensive and excellent. Be sure to check it out:

* Querying: http://guides.rubyonrails.org/active_record_querying.html
* Validations: http://guides.rubyonrails.org/active_record_validations.html
* Associations: http://guides.rubyonrails.org/association_basics.html

## Topics:

* Active Record as an ORM
    - Setting up models
        + `CREATE TABLE things...`
        + `class Thing < ActiveRecord::Base`
* CRUD Operations
    - CREATE
        + `instance = Model.new`
        + `instance.save`
        + `Model.create`
    - READ
        + `Model.find`
        + `Model.find_by`
        + `Model.where`
        + `Model.first` / `Model.last`
        + `find` vs `find_by` vs `where`
    - UPDATE
        + change object + `save`
        + `instance.update`
        + `Model.where(...).update_all(...)`
    - DELETE
        + `instance.destroy`
        + `Model.where(...).destroy_all`
    - Quick note on bangs - `save` vs. `save!`
        + Normal methods - `save`, `create` etc. - fail silently
        + "Banged" methods - `save!`, `create!` etc. - raise exceptions on failure
* Method Chaining
    - `Model.where(...).where.not(...).order(...)...`
* Brief intro to Validations
    - `validates :field, <conditions>`
* Associations
    - `has_many`
    - `belongs_to`

## Code

The code discussed in class can be found inside [`/code`](code). Note this is code created **exclusively** to demonstrate `ActiveRecord` in class, so all tables will be destroyed every time [`setup.rb`](code/setup.rb) is run.

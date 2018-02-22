# Intro to Rails (and MVC)

Today we looked at Ruby on Rails, one of the most popular web frameworks out there.
The main difference between a library and a framework is that libraries only provide **functionality** while frameworks suggest (and sometimes enforce) **a way to organize your project**.

The Rails documentation is very complete, and the [getting started page](http://guides.rubyonrails.org/getting_started.html) is a good place as any to start. The main parts of Rails are:

* **Models**, which deal with database communication, data validation and business logic.
* **Views**, which display data to the user.
* **Controllers**, which handle user requests, making the connection between views and models.

![MVC diagram](https://fzero.github.io/lhl-lectures/assets/mvc_diagram.svg)

## Other things

### Ruby

Remember that routes, schema, migrations, etc are all about writing ruby. You're still getting used to it but take the time to look at the syntax to understand what is happening.

Eg, you can read:
```ruby
# routes.rb
resources :orders, only: [:create, :show]
```
as:
```js
resources(:orders, { only: [:create, :show] })
```

### Rake

* Used to run pre-defined ruby scripts from the command line
* Let's just call it a "Script runner", even though it's a bit more
* Rails could have written our command line scripts (`db:migrate`) as straight up `.rb` files but `rake` gives us some more benefits like `bin/rake -T` (shows all available scripts).

### Symbols

You're not very familiar with Symbols. They are a first class and very commonly used thing in Ruby. Nothing too complicated. While not technically accurate, I suggest you see them as globally unique strings.

Good reading about this here: http://www.rubyfleebie.com/an-introduction-to-symbols/

### Debugging tips

Four main ways:

* `raise something.inspect` - you can do this anywhere.
* `puts something.inspect` - check the command line (rails log)
* `<%= debug something %>` - HTML / ERB layer only
* Use `binding.pry` or `byebug` with which you can set breakpoints (similar as debugger in Node)

### Important folders

Focus on these files/folders at first...

**High level (Declarations):**

* `/README.md` :)
* `/db/schema.rb` (AR snapshot of the DB schema)
* `/config/routes.rb` (Routes / Dispatcher)
* `/Gemfile` (like with every ruby project)

**All of the "MVC" code is separated here:**

* `/app/views` (ERB Templates)
* `/app/controllers` (Controller classes)
* `/app/models` (AR models)
* `/db/migrate` (migrations in here of course)

There are other folders (eg: `/app/assets` for CSS/JS/Image assets) that you'll naturally discover too.

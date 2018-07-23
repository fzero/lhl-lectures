# Bicycles example

This is an easy setup using sqlite3. For the app itself to run, do this:

* `bundle install`
* `bin/rake db:reset && bin/rake db:seed`

And you're off!

## Rspec & Capybara

I had issues with the suggested `geckodriver`, so I've switched to `chromedriver` in this project. [Download it here](https://sites.google.com/a/chromium.org/chromedriver/) then put it in a directory where your OS can find executables (`/usr/local/bin` usually works).

I've followed [this article](https://robots.thoughtbot.com/headless-feature-specs-with-chrome) to set it up.
See [`/spec/spec_helper.rb`](spec/spec_helper.rb#L21-L38) for more details.

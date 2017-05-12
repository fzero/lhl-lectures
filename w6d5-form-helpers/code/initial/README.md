# Bicycles example

This is an easy setup using sqlite3. For the app itself to run, do this:

* `bundle install`
* `bin/rake db:reset && bin/rake db:seed`

And you're off!

## Rspec & Capybara

I had issues with the suggested `geckodriver`, so I've switched to `chromedriver` in this project. [Download it here](https://sites.google.com/a/chromium.org/chromedriver/) then put it in a directory where your OS can find executables (`/usr/local/bin` usually works).

I've followed [this Stack Overflow response](http://stackoverflow.com/questions/21445164/set-chrome-as-default-browser-for-rspec-capybara#21453068) to set it up.
See [`/spec/spec_helper.rb`](spec/spec_helper.rb#L21-L25) for more details.

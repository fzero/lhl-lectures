# Rails form helpers

> **NOTE:** The curriculum has changed. W6D5 now deals with nested routing.

Rails comes built-in with several helper methods to make form creation much easier. [The official guides are excellent, so make sure to read them!](http://guides.rubyonrails.org/form_helpers.html)

In a nutshell:

* [Basic forms](http://guides.rubyonrails.org/form_helpers.html#dealing-with-basic-forms) aren't related to ActiveRecord models. These helpers are used to create search forms, option selectors and the like.
  * They're defined using `<%= form_tag ... %>`
  * Every helper used within looks like `<%= <element>_field_tag ... %>`.
* [Model forms](http://guides.rubyonrails.org/form_helpers.html#dealing-with-model-objects) are tied to an ActiveRecord object.
  * They're defined with `<%= form_for @instance ... do |instance| %>`
  * Every helper used within looks like `<%= instance.<element>_field ... %>`
  * These forms will do several things automatically, including filling in existing values for `edit` actions and figuring out where the form data should be submitted. This means it will:
    * `POST` to the corresponding `create` action when the form is on a `/new` page and
    * `PATCH` to the corresponsing `update` action when the form is on a `/:id/edit` page.

The code discussed in class is in the [`/code`](code) folder as usual. Make sure to read the project's [README](code/README.md) to set everything up correctly.

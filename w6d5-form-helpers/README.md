# Rails form helpers

Rails comes built-in with several helpers methods to make form creation much easier. [The official guides are excellent, so make sure to read them!](http://guides.rubyonrails.org/form_helpers.html)

In a nutshell:

* [Basic forms](http://guides.rubyonrails.org/form_helpers.html#dealing-with-basic-forms) aren't related to ActiveRecord models. These helpers are used to create search forms, option seletors and the like.
* [Model forms](http://guides.rubyonrails.org/form_helpers.html#dealing-with-model-objects) are tied to an ActiveRecord model and will do several things automatically, including filling in existing values for `edit` actions and figuring out where the form data should be submitted. This means it will:
  * `POST` to the corresponding `create` action when the form is on a `/new` page and
  * `PATCH` to the corresponsing `update` action when the form is on a `/:id/edit` page.

The code discussed in class is in the [`/code`](code) folder as usual. Make sure to read the project's [README](code/README.md) to set everything up correctly.

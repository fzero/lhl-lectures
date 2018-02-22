# Rails routes: nested resources and namespacing

As always, [Rails docs are incredible](http://guides.rubyonrails.org/routing.html), but today we'll concentrate on how we can use nested routes for fun and profit.

## Topics

* [Being RESTful with nested resources](http://guides.rubyonrails.org/routing.html#nested-resources)
  * How to deal with nested routes inside controllers
  * Changes to `params`
    * With nesting you'll always get **two** ids
    * You're always going to the **nested** controller
      * `/styles/:style_id/bicycles` goes to `bicycles#index`, not to `styles#show`
    * Always check `bin/rake routes`
  * [Shallow nesting](http://guides.rubyonrails.org/routing.html#shallow-nesting)
* [Namespacing](http://guides.rubyonrails.org/routing.html#controller-namespaces-and-routing)
  * It's completely different from nesting!
  * It's a **different view** for an **existing resource**
  * See the example admin routes in [`/jungle`](jungle)

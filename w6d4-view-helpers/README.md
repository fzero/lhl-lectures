# Intro to view helpers

## Why they exist

View helpers are methods that return either strings or HTML. They're used to  create reusable components that contain some ruby logic inside (e.g. a button that changes state according to a condition).

Rails comes with several built-in helpers to create `<a>` tags (`link_to`), buttons (`button_tag`), images (`image_tag`), forms and their components (`form_tag`, `select_tag`...) and many other useful things.

It's important to note that view helpers **only exist inside views**, while route helpers (`product_path`, `category_url` and all other methods generated from routes) also exist in the controller. This means you **can** do this...
```ruby
# Inside a controller action
redirect_to cart_path  # Redirects to '/cart'
```
...but you **can't** do this:
```ruby
# Inside a controller action
link_to cart_path  # Would output `<a href="/cart">...</a>`,
                   # which doesn't make any sense in a controller!
```

The Rails documentation is great as usual:
* [Views and asset helpers](http://guides.rubyonrails.org/layouts_and_rendering.html)
* [Form helpers](http://guides.rubyonrails.org/form_helpers.html)

## Built-in vs our own

We can create our own helpers to automate repetitive tasks on views. Helpers are always added to files inside `app/helpers`, and each file is a `module` included automatically in the view context by Rails. Using the Jungle app as an example, we created a very simple helper that is a bit, um, opinionated about product prices:

```rb
# app/helpers/application_helper.rb
module ApplicationHelper

  def fancy_price(product)
    if product.price > 1000
      "#{product.price}??? Hella expensive!"
    else
      "#{product.price} is kinda reasonable."
    end
  end

end
```
```erb
<!-- Inside a view -->
<p><%= fancy_price @product %></p> <!-- 1200.00??? Hella expensive! -->
```

## Route helpers (`_path` and `_url`)

I'm mentioning them here to avoid confusion. Route helpers are based on the routes defined in `config/routes.rb` and can be used both in controllers and views. Whenever you use the `bin/rake routes` command, you're automatically getting a list of all possible route helper _prefixes_:

```
Prefix   Verb   URI Pattern                   Controller#Action
root     GET    /                             products#index
products GET    /products(.:format)           products#index
product  GET    /products/:id(.:format)       products#show
...
```
So if I want to link (or redirect) to the products index, I can use the `products_path` helper to get the corresponding path (`/products`), `product_path @product` to link to a specific product (`/products/:id`) and so on. I can also use the `_url` suffix to get the full URL to a resource.
```ruby
product_url @product #=> 'http://mysite.com/products/:id'
```

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

## BONUS: Metaprogramming & `method_missing` - where the magic comes from

You might have noticed that Rails somehow "knows" some things exist and creates corresponding methods automatically. For example:

```
# On bin/rails console

irb(main):003:0> Product
=> Product(id: integer, name: string, description: text, image: string, price_cents: integer, quantity: integer, created_at: datetime, updated_at: datetime, category_id: integer)

irb(main):005:0> Product.find_by_name("Men's Classy shirt")
=> #<Product id: 1, name: "Men's Classy shirt", description: "Intelligentsia kinfolk pabst 3 wolf moon. Wayfarer...", image: "apparel1.jpg", price_cents: 6499, quantity: 10, created_at: "2017-08-04 13:58:38", updated_at: "2017-08-04 13:58:38", category_id: 1>
```

All `Product`s have names, so ActiveRecord automatically created a `find_by_name` method. How? Metaprogramming! All Ruby classes inherit from `BasicObject`, and that class provides a few special methods that can be overriden. The most common ones are type converters - `to_s`, `to_i` and so on. You can create your own by overriding them in your class:

```ruby
class Classy

  def initialize(name)
    @name = name
  end

  def to_s
    "I say, #{@name.capitalize} is indubitably one classy individual."
  end
end

fabio = Classy.new('Fabio')
puts fabio  # calls to_s internally
#=> I say, Fabio is indubitably one classy individual.
```

One of these special methods is `method_missing`. That method is called every time Ruby can't find a method in your class - and you can override that too!

```ruby
class SoMagic

  def initialize(name)
    @name = name
  end

  def method_missing(method_name, *args, &block)
    "#{@name} does not know how to #{method_name}, unfortunately!"
  end
end

leeroy_jenkins = SoMagic.new('Leeroy Jenkins')
puts leeroy_jenkins.chill  # calls method_missing internally
#=> Leeroy Jenkins does not know how to chill, unfortunately!
```

Note there's **no** method called `chill` in the class. [This article](https://www.leighhalliday.com/ruby-metaprogramming-method-missing) has a more in-depth explanation on how to use `method_missing` for fun and profit.

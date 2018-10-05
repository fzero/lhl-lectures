// A plain Javacript object - just a key-value pair
const data = {
  department: "Men's clothes",
  name: "Fancy Shirt",
  description: "The fanciest of shirts!",
  size: "S",
  color: "Red with polka dots",
  price: "45.90"
}

// Now we're creating a class. This will be used to create
// a template ensuring every product created with it will
// have the same properties and methods
class Product {
  constructor(initialData = {}) {
    this.department = initialData.department
    this.name = initialData.name
    this.description = initialData.description
    this.size = initialData.size
    this.color = initialData.color
    this.price = initialData.price // Using the price() setter here (see below)
  }

  // We're storing the price in cents, but we want to make our
  // users' lives easier by converting a price in dollars to cents
  // automatically. We're creating a getter method for that.
  // Getters make a method look like a property, so we can
  // simply use product.price instead of product.price()
  get price() {
    const actualPrice = Number(this.priceInCents) / 100
    return isNaN(actualPrice) ? 0.00 : actualPrice
  }

  // This is a setter. Like the getter, it allows us to refer to price as a
  // property instead of a function. In other words, we can use:
  // product.price = 49.95
  // instead of
  // product.setPrice(49.95)
  // This will change this.priceInCents, which is the actual instance variable
  // storing the price value.
  set price(newPrice) {
    this.priceInCents = Number(newPrice) * 100
  }

  // Another getter returning the formatted price in CAD
  get formattedPrice() {
    return `CAD$ ${this.price.toFixed(2)}`
  }

  // Yet another getter returning a string description of the product
  get describe() {
    return `${this.color} ${this.name}: ${this.description} (${this.formattedPrice})`
  }
}

const product = new Product(data)

console.log(product)
console.log('-------')
console.log(product.describe)
console.log(product.formattedPrice)

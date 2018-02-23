// Quick classes example
// We're creating a Contact class to be used in a contact list

class Contact {
  constructor(initialData) { // We're receiving initial data through an object
    this.firstName = initialData.firstName
    this.lastName = initialData.lastName
    this.phone = initialData.phone
    this.email = initialData.email // This calls the setter below, so we have validation
  }

  get email() {
    return this._email
  }

  set email(theEmail) { // Sets this._email, but only if email is valid
    if (theEmail.match(/.+@.+\..+/)) {
      this._email = theEmail
    }
    else {
      throw "Email must be valid"
    }
  }

  toString() {
    return `
      ${this.firstName} ${this.lastName}: ${this.phone}
      Email: ${this.email}`
  }
}

// BusinessContact inherits all methods from Contact - code is reused!
class BusinessContact extends Contact {
  constructor(initialData) {
    super(initialData) // super() calls the method with the same name on Contact
    this.officePhone = initialData.officePhone
  }

  // We're not using super() here, so we're completely overriding
  // toString() on the parent class
  toString() {
    return `
      ${this.firstName} ${this.lastName}:
      Phone: ${this.phone}
      Office phone: ${this.officePhone}
      Email: ${this.email}`
  }
}

// Now we instantiate a Contact...
const leeroyJenkins = new Contact({
  firstName: 'Leeroy',
  lastName: 'Jenkins',
  email: 'leeroy@jenkins.com',
  phone: '647-555-5555'
})

// ...and a BusinessContact
const dougFord = new BusinessContact({
  firstName: 'Doug',
  lastName: 'Ford',
  email: 'dougford@nope.nope',
  phone: '647-555-5555',
  officePhone: '647-555-5555'
})

console.log(leeroyJenkins.toString())
console.log(dougFord.toString())

leeroyJenkins.email = "invalid@email@really.whatever.com"
// The line above throws an exception, since we're using our email() setter

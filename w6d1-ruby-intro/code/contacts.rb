class Contact

  attr_accessor :name, :phone, :address
  attr_reader :email

  def initialize(name, email, phone = 'N/A', address = 'N/A')
    @name = name
    @phone = phone
    @address = address
    # On the following line we're using `self` to refer to a the current
    # class instance and Uses our email= setter method with validation.
    self.email = email
  end

  def describe
    "#{@name} lives at #{@address}. Their phone is #{@phone} and their email is #{@email}"
  end

  def email=(new_email)
    if valid_email?(new_email)
      @email = new_email
    else
      raise "Invalid email"
    end
  end

  private

  def valid_email?(questionable_email)
    questionable_email =~ /.+@.+\..+/
  end

end


@fabio = Contact.new(
  "Fabio Neves",
  "thugswag4lyfe@example.com",
  "555-555-5555",
  "The Internets"
)
@batman = Contact.new(
  "Bruce Wayne",
  "batman@hotmail.com",
  "555-123-45678",
  "Batcave"
)
@hulk = Contact.new(
  "Robert Bruce Banner",
  "hulk@smash.org",
  "555-1234-0987",
  "I don't know, wherever I transformed last"
)

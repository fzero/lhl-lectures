class Contact

  attr_accessor :name, :phone, :email, :address

  def initialize(name, phone=nil, email=nil, address=nil)
    @name = name
    @phone = phone
    @email = email
    @address = address
  end

  def describe
    "#{@name} lives at #{@address}, their phone is #{@phone} and their email is #{@email}."
  end

end

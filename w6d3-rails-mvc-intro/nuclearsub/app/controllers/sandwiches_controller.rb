class SandwichesController < ApplicationController

  def index
    @sandwiches = Sandwich.all
  end

end

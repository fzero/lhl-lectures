class BicyclesController < ApplicationController

  def index
    @bicycles = Bicycle.all
  end

end

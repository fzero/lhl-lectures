class StylesController < ApplicationController

  def show
    @style = Style.find(params[:id])
    @bicycles = @style.bicycles
    render 'bicycles/index'
  end

end

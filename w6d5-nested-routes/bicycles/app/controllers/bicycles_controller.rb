class BicyclesController < ApplicationController

  def index
    @bicycles = Bicycle.all
    # Add filtering based on form fields (when present)
    @bicycles = @bicycles.where(model: params[:model]) if params[:model].present?
    @bicycles = @bicycles.where(style_id: params[:style]) if params[:style].present?
    @bicycles = @bicycles.where(brand_id: params[:brand]) if params[:brand].present?
    @bicycles = @bicycles.where(speeds: params[:speeds]) if params[:speeds].present?
  end

  def show
    @bicycle = Bicycle.find(params[:id])
  end

end

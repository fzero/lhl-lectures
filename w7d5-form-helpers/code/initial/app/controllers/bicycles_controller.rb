class BicyclesController < ApplicationController

  def index
    @bicycles = Bicycle.all
    @bicycles = @bicycles.where(model: params[:model]) if params[:model].present?
    @bicycles = @bicycles.where(style_id: params[:style]) if params[:style].present?
    @bicycles = @bicycles.where(brand_id: params[:brand]) if params[:brand].present?
    @bicycles = @bicycles.where(speeds: params[:speeds]) if params[:speeds].present?
  end

  def new
    @bicycle = Bicycle.new
  end

  def edit
    @bicycle = Bicycle.find(params[:id])
  end

  def create
    result = Bicycle.create(bicycle_params)
    if result
      flash[:notice] = "Bicycle created"
      redirect_to bicycles_path
    else
      flash[:error] = "Coudn't create bicycle!"
      redirect_to :back
    end
  end

  def update
    @bicycle = Bicycle.find(params[:id])
    result = @bicycle.update(bicycle_params)
    if result
      flash[:notice] = "Bicycle updated"
      redirect_to bicycles_path
    else
      flash[:error] = "Coudn't update bicycle!"
      redirect_to :back
    end
  end

  private

  def bicycle_params
    params.require(:bicycle).permit([:id, :model, :colour, :speeds, :style_id, :brand_id])
  end

end

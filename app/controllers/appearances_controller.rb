class AppearancesController < ApplicationController
  before_action :find_user, only: [:index, :create]
  
  def index
    @appearances = Appearance.where(user_id: @user.id)
    render json: @appearances, include: "**"
  end

  def create
    # if Appearance.find(id: params[:user_id]) === nil
    #   @appearance = Appearance.new(appearance_params)
    # else
    #   @appearance = Appearance.find(id: params[:id])
    # end
    
    @appearance = Appearance.new(appearance_params)
    @appearance.user = @user
    if @appearance.save
      render json: @appearance, status: :created
    else 
      render json: @appearance.errors, status: :unprocessable_entity
    end

    ActionCable.server.broadcast 'appearances_channel', @appearance
  end

  private 
  def appearance_params
    params.require(:appearance).permit(:status, :user_id)
  end

  def find_user
    @user = User.find(params[:user_id])
  end

end

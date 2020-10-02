class AppearancesController < ApplicationController
  before_action :find_user, only: :index
  
  def index
    @appearances = Appearance.where("requester_id = ? OR addressee_id = ?", @user.id, @user.id)
    render json: @appearances
  end

  def create
    if Appearance.find(id: params[:id]) === nil
      @appearance = Appearance.create(appearance_params)
    else
      @appearance = Appearance.find(id: params[:id])
    end
    ActionCable.server.broadcast 'appearances_channel', appearance
  end

  private 
  def appearance_params
    params.require(:appearance).permit(:status)
  end

  def find_user
    @user = User.find(params[:user_id])
  end

end

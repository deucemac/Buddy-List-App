class AppearancesController < ApplicationController
  # before_action :find_user, only: [:index, :create]
  before_action :find_user, only: [ :create]
  
  def index
    # @appearances = Appearance.where(status: true)
    @appearances = Appearance.where(status: true)
    # @appearances = Appearance.all
    render json: @appearances
    
  end

  def create
    if Appearance.find_by(user_id: params[:user_id]) == nil
      @appearance = Appearance.new(appearance_params)
      @appearance.user_id = @user.id
      if @appearance.save 
        render json: @appearance, status: :created
      end
    elsif Appearance.find_by(user_id: params[:user_id])
      @appearance = Appearance.find_by(user_id: params[:user_id])
      @appearance.user_id = @user.id
      @appearance.save
      render json: @appearance
    else
      render json: @appearance.errors, status: :unprocessable_entity
    end
    
    


    # @appearance = Appearance.new(appearance_params)
    # @appearance.user_id = @user.id
    # if @appearance.save
    #   render json: @appearance, status: :created

    # else 
    #   render json: @appearance.errors, status: :unprocessable_entity
    # end

    ActionCable.server.broadcast 'appearances_channel', @user
  end

  def update
    @appearance = Appearance.find(params[:id])
    if @appearance.update(appearance_params)
      render json: @appearance
    else
      render json: @appearance.errors, status: :unprocessable_entity
    end
  end

  def getAppearances
    render json: @user
  end

  private 
  def appearance_params
    params.require(:appearance).permit(:status, :user_id)
  end

  def find_user
    @user = User.find(params[:user_id])
  end

end

class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  # before_action :authorize_request, only: :update

  # GET /users
  def index
    @users = User.all

    render json: @users
  end
  # def index
  #   @users = User.where(status: true)

  #   render json: @users
  # end

  def get_online_users
    @users = User.where(status: true)

    render json: @users
  end



  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      @token = encode({user_id: @user.id})
      render json: { user: @user.attributes.except(:password_digest), token: @token }, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end

    # render json: @user
    



      ActionCable.server.broadcast 'appearances_channel', @user
    
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:id, :email, :username, :image, :password, :status)
    end
end

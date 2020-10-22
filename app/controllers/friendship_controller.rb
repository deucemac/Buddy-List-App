class FriendshipController < ApplicationController
  before_action :find_user, only: :index
  before_action :find_friendship, only: [:show, :update, :destroy]
  
  def index 
    @friendship = Friendship.where("requester_id = ? OR addressee_id = ?", @user.id, @user.id)

    render json: @friendship
  end

  def show
    render json: @friendship
  end

  def create
    @friendship = Friendship.new(friendship_params)

    if @friendship.save
      render json: @friendship, status: :created
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  def update 
    if @friendship.update(friendship_params)
      render json: @friendship
    else 
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  def destroy 
    @friendship.destroy
  end


  private 
  
  def find_friendship
    @friendship = Friendship.find(params[:id])
  end

  def find_user
    @user = User.find(params[:user_id])
  end

  def friendship_params
    params.require(:friendship).permit(:requester_id, :addressee_id, :status)
  end
end

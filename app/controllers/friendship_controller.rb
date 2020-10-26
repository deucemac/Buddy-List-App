class FriendshipController < ApplicationController
  before_action :find_user, only: [:index, :create, :destroy]
  before_action :find_friendship, only: [:show, :update, :destroy]
  
  def index 
    @friendship = Friendship.where("requester_id = ? OR addressee_id = ?", @user.id, @user.id)

    render json: @friendship
  end

  def show
    render json: @friendship
  end

  # def create

  #   @friendship = Friendship.new(friendship_params)

  #   if @friendship.save
  #     render json: @friendship, status: :created
  #   else
  #     render json: @friendship.errors, status: :unprocessable_entity
  #   end
  # end

  def create
    @friendship = Friendship.new(friendship_params)

    @existing_friend = Friendship.find_by(requester_id: @user.id, addressee_id: @friendship.addressee_id) 
    @existing_friend_2 = Friendship.find_by(addressee_id: @friendship.addressee_id, requester_id: @friendship.requester_id)
  
    if @existing_friend
      render json: @user
    elsif @friendship
      if @existing_friend_2
      render json: @user
      end
    elsif @friendship.save
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

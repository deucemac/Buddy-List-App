class User < ApplicationRecord
  
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, on: :create 

  has_many :friendships, -> (user) { where("requester_id = ? OR addressee_id = ?", user.id, user.id )}, class_name: 'Friendship'
  has_many :friends, through: :friendships

  has_one :appearance

end

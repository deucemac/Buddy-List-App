class User < ApplicationRecord
  # has_many :requester_users, foreign_key: :addressee_id, class_name: 'Friendship'
  # has_many :requesters, through: :requester_users, source: :requester  

  # has_many :addressee_users, foreign_key: :requester_id, class_name: 'Friendship'
  # has_many :addressees, through: :addressee_users, source: :addressee
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, on: :create 

  has_many :friendships, -> (user) { where("requester_id = ? OR addressee_id = ?", user.id, user.id )}, class_name: 'Friendship'
  has_many :friends, through: :friendships

  has_one :appearance

end

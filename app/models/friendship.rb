class Friendship < ApplicationRecord
  belongs_to :requester, foreign_key: :requester_id, class_name: 'User'
  belongs_to :addressee, foreign_key: :addressee_id, class_name: 'User'
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Friendship.destroy_all
User.destroy_all

@sam = User.create!(email:'sam@mail.com', username:'sam', image:'https://images.unsplash.com/photo-1482235225574-c37692835cf3')
@jacob = User.create!(email:'jacob@mail.com', username:'jacob', image:'https://images.unsplash.com/photo-1549473448-5d7196c91f48')
@alex = User.create!(email:'alex@mail.com', username:'alex', image:'https://images.unsplash.com/photo-1561677843-39dee7a319ca')
@dan = User.create!(email:'dan@mail.com', username:'dan', image:'https://images.unsplash.com/photo-1594533136556-5e46506f63cf')
@lance = User.create!(email:'lance@mail.com', username:'lance', image:'https://images.unsplash.com/photo-1530268729831-4b0b9e170218')
@josh = User.create!(email:'josh@mail.com', username:'josh', image:'https://images.unsplash.com/photo-1463453091185-61582044d556')
@reggie = User.create!(email:'reggie@mail.com', username:'reggie', image:'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f')
@tia = User.create!(email:'tia@mail.com', username:'tia', image:'https://images.unsplash.com/photo-1484863137850-59afcfe05386')
@tracy = User.create!(email:'tracy@mail.com', username:'tracy', image:'https://images.unsplash.com/photo-1450297350677-623de575f31c')
@jill = User.create!(email:'jill@mail.com', username:'jill', image:'https://images.unsplash.com/photo-1490003695933-fc769c821a45' )
@keke = User.create!(email:'keke@mail.com', username:'keke', image:'https://images.unsplash.com/photo-1502685104226-ee32379fefbe' )

@friendship = Friendship.create!(requester_id: @jacob.id, addressee_id: @sam.id, status: 1)
@friendship = Friendship.create!(requester_id: @dan.id, addressee_id: @sam.id, status: 1)
@friendship = Friendship.create!(requester_id: @sam.id, addressee_id: @tia.id, status: 1)
@friendship = Friendship.create!(requester_id: @jill.id, addressee_id: @sam.id, status: 1)
@friendship = Friendship.create!(requester_id: @keke.id, addressee_id: @sam.id, status: 1)

@friendship = Friendship.create!(requester_id: @jacob.id, addressee_id: @sam.id, status: 1)
@friendship = Friendship.create!(requester_id: @josh.id, addressee_id: @jacob.id, status: 1)
@friendship = Friendship.create!(requester_id: @jacob.id, addressee_id: @keke.id, status: 1)

@friendship = Friendship.create!(requester_id: @jacob.id, addressee_id: @keke.id, status: 1)
@friendship = Friendship.create!(requester_id: @keke.id, addressee_id: @sam.id, status: 1)
@friendship = Friendship.create!(requester_id: @jill.id, addressee_id: @keke.id, status: 1)
@friendship = Friendship.create!(requester_id: @keke.id, addressee_id: @jacob.id, status: 1)

class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
    # stream_from "chat_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak
  end

  # def receive(data)
  #   ActionCable.server.broadcast("chat_#{params[:room]}", data)
  # end

end

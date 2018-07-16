class IndexController < ApplicationController
  def index
    posts = Post.limit(10).order(:created_at).to_a
    @client_state = {
      posts: posts.map { |p|
        {
          id: p.id,
          body: p.body,
          timestamp: p.created_at,
        }
      },
    }
  end
  attr_reader :client_state
  helper_method :client_state
end

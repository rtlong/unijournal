class PostsController < ApplicationController
  def index
    posts = Post.limit(10).order(:created_at).to_a

    respond_to do |format|
      format.json { render json: posts }
    end
  end
end

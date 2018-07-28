class PostsController < ApplicationController
  def index
    @posts = Post.includes(:tags).order(created_at: :desc).limit(10).to_a
  end

  def create
    post = Post.create(body: params.fetch(:body))

    respond_to do |format|
      format.json {
        render json: post
      }
    end
  end
end

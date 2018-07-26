class PostsController < ApplicationController
  def index
    posts = Post.limit(10).order(created_at: :desc).to_a

    respond_to do |format|
      format.json { render json: posts }
    end
  end

  def create
    post = Post.create(body: params.fetch(:body))

    respond_to do |format|
      format.json { render json: post }
    end
  end
end

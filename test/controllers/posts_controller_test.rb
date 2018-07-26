require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @posts = (1..11).map do |i|
      Post.create!(body: "#{i} foo bar #banana")
    end
  end

  describe "index" do
    it "returns the most recent 10 posts" do
      expected_posts = @posts.last(10).reverse

      get posts_url, as: :json
      assert_response :success
      assert_equal 'application/json', @response.content_type

      parsed_response = JSON.parse(@response.body)

      %i[id body].each do |attr|
        assert_equal expected_posts.map(&attr),
                     (parsed_response.map { |h| h.fetch(attr.to_s) })
      end
      assert_equal expected_posts.map(&:created_at).map(&:to_json),
                   (parsed_response.map { |h| h.fetch('created_at').to_json })

      assert_equal expected_posts.map(&:tags).map(&:to_json),
                   (parsed_response.map { |h| h.fetch('tags').to_json })
    end
  end
end

require "test_helper"

class PostTest < ActiveSupport::TestCase
  it "requires a body" do
    p = Post.new
    assert !p.save
    assert_equal p.errors.messages[:body], ["can't be blank"]
  end

  it "extracts hashtags on save" do
    body = <<~END_BODY
      # this isn't a hash tag
      #thisisa-hashtag #heres_another #foo @bar
    END_BODY
    expected_names = %w[thisisa-hashtag heres_another foo]

    p = Post.create!(body: body)
    assert_equal p.tags_names, expected_names
    # each name now corresponds to a Tag with that name
    assert_equal p.tags.map(&:persisted?), [true, true, true]
    assert_equal Tag.where(name: expected_names).all, p.tags
  end
end

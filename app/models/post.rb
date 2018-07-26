class Post < ApplicationRecord
  validates :body, presence: true

  has_many :taggings
  has_many :tags, through: :taggings

  def body=(body)
    super(body)
    self.tag_names = body.scan(/#([[:alnum:]_-]+)\b/).flatten
  end

  def tag_names
    tags.map(&:name)
  end

  def tag_names=(names)
    self.tags = names.map { |name|
      Tag.where(name: name).first_or_initialize
    }
  end
end

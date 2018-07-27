class Types::PostType < Types::BaseObject
  field :id, ID, null: true
  field :body, String, null: true
  field :timestamp, Types::DateTime, null: true
  field :tags, [Types::TagType], null: true

  def timestamp
    object.created_at
  end
end

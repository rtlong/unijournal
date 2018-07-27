class Types::QueryType < Types::BaseObject
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :posts, [Types::PostType], null: false do
    argument :since, Types::DateTime, required: false, description: 'limit results to posts created at this time or after'
    argument :limit, Integer, required: false, description: 'limit results to this many posts'
  end

  def posts(since: false, limit: 10)
    t = Post.arel_table
    rel = Post.order(created_at: :desc).includes(:tags)
    rel = rel.where(t[:created_at].gteq(since)) if since
    rel = rel.limit(limit)
    rel
  end
end

class Mutations::CreatePost < Mutations::BaseMutation
  argument :body, String, required: true

  field :post, Types::PostType, null: true
  field :errors, [String], null: false

  def resolve(body:)
    p = Post.create(body: body)

    unless p.persisted?
      return {
        post: nil,
        errors: p.errors.full_messages,
      }
    end

    {
      post: p,
      errors: [],
    }
  end
end

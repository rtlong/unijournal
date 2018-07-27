class UnijournalSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  def self.resolve_type(abstract_type, obj, ctx)
    p resolve_type: [abstract_type, obj, ctx]
  end

  def self.object_from_id(node_id, ctx)
    p object_from_id: [node_id, ctx]
  end

  def self.id_from_object(object, type, ctx)
    p id_from_object: [object, type, ctx]
  end
end

json.array! @posts do |post|
  json.id post.id
  json.body post.body
  json.created_at post.created_at
  json.tag_names post.tag_names
  json.tags post.tags
end

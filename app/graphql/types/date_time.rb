class Types::DateTime < Types::BaseScalar
  description 'A date/time serialized as JSON-compatible ISO-8601'

  def self.coerce_input(input_value, _context)
    Time.iso8601(input_value)
  rescue ArgumentError
    raise GraphQL::CoercionError, "#{input_value.inspect} is not a valid ISO8601 string"
  end

  def self.coerce_result(ruby_value, _context)
    ruby_value.iso8601(3)
  end
end

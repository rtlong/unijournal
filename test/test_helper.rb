ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'minitest/spec'

module ActiveSupport
  class TestCase
    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    extend MiniTest::Spec::DSL

    register_spec_type self do |desc|
      desc < ActiveRecord::Base if desc.is_a? Class
    end
  end
end

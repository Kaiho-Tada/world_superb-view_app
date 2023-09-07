FactoryBot.define do
  factory :type do
   sequence(:name)      { |n| "type_name#{n}" }
  end
end

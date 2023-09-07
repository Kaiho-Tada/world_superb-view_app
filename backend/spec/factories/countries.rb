FactoryBot.define do
  factory :country do
    sequence(:name)      { |n| "country_name#{n}" }
    association :state
  end
end

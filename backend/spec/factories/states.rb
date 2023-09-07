FactoryBot.define do
  factory :state do
    # sequence(:name) { |n| "State#{n}"}
    sequence(:name)      { |n| "state_name#{n}" }
  end
end

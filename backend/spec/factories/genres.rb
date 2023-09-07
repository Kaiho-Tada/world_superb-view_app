FactoryBot.define do
  factory :genre do
    sequence(:name)      { |n| "genre_name#{n}" }
    sequence(:category)      { |n| "genre_category#{n}" }
  end
end

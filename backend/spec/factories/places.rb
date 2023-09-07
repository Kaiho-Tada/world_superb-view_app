FactoryBot.define do
  factory :place do
    sequence(:name)      { |n| "place_name#{n}" }
    portrait { fixture_file_upload("images/test_image.jpg") }
    # portrait { file_fixture('test_image.avif', 'images') }
    # portrait { fixture_file_upload(Rails.root.join("spec", "fixtures", "images", "test_image.jpg"))}
    # trait :with_portrait do
    #   portrait { fixture_file_upload("images/test_image.jpg") }
    # end
  end
end

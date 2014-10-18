FactoryGirl.define do
  factory :video do
    name { Faker::Name.title }
    source_url { Faker::Internet.url('youtube.com') }
    user
  end
end

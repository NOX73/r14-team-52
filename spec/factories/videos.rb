FactoryGirl.define do
  factory :video do
    name { Faker::Name.title }
    source_url 'http://youtu.be/aSvZEyQT52k'
    user
  end
end

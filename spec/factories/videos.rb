FactoryGirl.define do
  factory :video do
    name { Faker::Name.title }
    youtube_video_id 'n_yHZ_vKjno'
    user
  end
end

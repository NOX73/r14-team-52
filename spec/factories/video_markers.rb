FactoryGirl.define do
  factory :video_marker, :class => 'Video::Marker' do
    name
    description
    link { Faker::Internet.url('wikipedia.org') }
    start_at { generate(:timestamp) }
    x { generate(:integer) }
    y { generate(:integer) }
    video

    factory :link do
      type_of_marker Video::Marker::LINK
    end

    factory :info do
      type_of_marker Video::Marker::INFO
    end
  end
end

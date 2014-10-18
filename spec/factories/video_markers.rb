FactoryGirl.define do
  factory :video_marker, :class => 'Video::Marker' do
    name
    description
    type_of_marker 0
    link { Faker::Internet.url('wikipedia.org') }
    start_at { generate(:timestamp) }
    x { generate(:integer) }
    y { generate(:integer) }
    video

    factory :link do
      type_of_marker 0
    end

    factory :info do
      type_of_marker 1
    end
  end
end

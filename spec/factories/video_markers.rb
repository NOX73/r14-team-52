# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :video_marker, :class => 'Video::Marker' do
    name "MyString"
    image "MyString"
    description "MyString"
    type 1
    link "MyString"
    start_at "2014-10-18 02:16:22"
    x 1
    y 1
    video nil
  end
end

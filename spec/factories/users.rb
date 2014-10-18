FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password(3, 10) }
    password_confirmation { password }
  end
end

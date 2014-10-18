# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :video do
    name "MyString"
    source_url "MyString"
    user nil
  end
end

class User < ActiveRecord::Base
  authenticates_with_sorcery! do |config|
    config.authentications_class = Authentication
  end

  has_many :authentications, :dependent => :destroy
  accepts_nested_attributes_for :authentications

  validates :password, length: { minimum: 3 }
  validates :password, confirmation: true
  validates :password_confirmation, presence: true

  validates :email, uniqueness: true

  # remove this feature after RailsRumble
  def self.new_guest
    new { |u| u.guest = true; u.email = "test#{User.last.id}@test.com"; u.password = "123"; u.password_confirmation = "123" }
  end
end

class User < ApplicationRecord
  has_secure_password
  has_many :recipes, dependent: :destroy

  validates_presence_of :email
  validates :email, uniqueness: true
end

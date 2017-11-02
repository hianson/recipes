class User < ApplicationRecord
  has_secure_password
  has_many :recipes

  validates_presence_of :email, :password_digest
  validates :email, uniqueness: true
end

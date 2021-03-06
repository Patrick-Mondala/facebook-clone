class User < ApplicationRecord
  attr_reader :password

  validates :email, :password_digest, :session_token, :first_name, :last_name, :birth_date, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true


  after_initialize :ensure_session_token

  has_one_attached :profile_picture
  has_one_attached :cover_picture

  has_many :authored_posts,
    foreign_key: :author_id,
    class_name: :Post

  has_many :timeline_posts,
    foreign_key: :timeline_owner_id,
    class_name: :Post

  has_many :sent_friend_requests,
    foreign_key: :requester_id,
    class_name: :Friendship

  has_many :received_friend_requests,
    foreign_key: :requested_id,
    class_name: :Friendship

  has_many :likes
  has_many :liked_posts, through: :likes, source: :likeable, source_type: "Post"
  has_many :liked_comments, through: :likes, source: :likeable, source_type: "Comment"

  def friends
    accepted_sent_requests = self.sent_friend_requests.select { |friendship| friendship.accepted }
    accepted_received_requests = self.received_friend_requests.select { |friendship| friendship.accepted }
    accepted_sent_requests.concat(accepted_received_requests)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_unique_session_token
    save!
    self.session_token
  end

  private

  def ensure_session_token
    generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end

end
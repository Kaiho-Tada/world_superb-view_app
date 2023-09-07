require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'ユーザー登録' do
    it "name、email、passwordとpassword_confirmationが存在すれば登録できること" do
      expect(build(:user)).to be_valid
    end

    # it "nameがなければ無効な状態であること" do
    #   user = build(:user, name: nil)
    #   user.valid?
    #   expect(user.errors[:name]).to include("can't be blank")
    # end

    it "emailがなければ無効な状態であること" do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "passwordがなければ無効な状態であること" do
      user = build(:user, password: nil)
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

    # it "password_confirmationがなければ無効な状態であること" do
    #   user = build(:user, password_confirmation: nil)
    #   user.valid?
    #   expect(user.errors[:password_confirmation]).to include("can't be blank")
    # end

    it "重複したメールアドレスなら無効な状態であること" do
      create(:user, email: "test@example.com")
      user = build(:user, email: "test@example.com")
      user.valid?
      expect(user.errors[:email]).to include("has already been taken")
    end

    it "passwordは少なくとも6文字以上であること" do
      user = build(:user, password: "passw")
      user.valid?
      expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
    end
  end
end

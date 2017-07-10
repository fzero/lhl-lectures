require 'rails_helper'

RSpec.describe Brand, type: :model do

  context "Validations" do

    # NOTE: these matchers are provided by the `shoulda-matchers` gem
    # They're not provided automatically by RSpec itself.
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:country) }

  end

end

class Flower

  attr_reader :species, :color, :scent, :season, :rating

  def initialize(species, color, scent, season = 'perennial', rating = 0)
    @species = species
    @color = color
    @scent = scent
    @season = season
    # We're using our custom setter here instead of assigning the value
    # directly to @rating.
    # Because our setter has the same name as our argument, we're
    # explicitly calling it with self.rating.
    self.rating = rating
  end

  def rating=(new_rating)
    raise "Rating must be an integer" unless new_rating.class == Integer
    if new_rating < 0 || new_rating > 10
      raise "Rating must be between 0 and 10"
    end
    @rating = new_rating
  end
end


class Daisy < Flower

  def initialize(color, scent, season = 'perennial', rating = 0)
    super('Daisy', color, scent, season, rating)
  end

end

require 'active_support/all'

# OOP version of the Candidates assignment.
# Note how all methods that should take a candidate are defined
# _inside_ the class, since all necessary data is available in every
# Candidate instance.

class Candidate

  attr_reader :id, :years_of_experience, :github_points,
              :languages, :date_applied, :age

  # We're initializing each instance with a hash
  def initialize(data)
    @id = data[:id]
    @years_of_experience = data[:years_of_experience]
    @github_points = data[:github_points]
    @languages = data[:languages]
    @date_applied = data[:date_applied]
    @age = data[:age]
  end

  def experienced?
    @years_of_experience > 2
  end

  def knows?(language)
    @languages.include?(language)
  end

  def ruby_or_python?
    knows?('Ruby') || knows?('Python')
  end

  def applied_recently?
    @date_applied >= 15.days.ago.to_date
  end

  def over_18?
    @age > 18
  end

  def github_points?(points)
    @github_points > points
  end

  def qualified?
    experienced? && ruby_or_python? &&  # Using previously defined methods
    applied_recently? && over_18? &&
    github_points?(100)
  end

  # Class methods run directly on the _class_ instead of
  # the _instance_. They're mostly used to deal with collections of objects
  # or anything else that deals with more than one instance of that class.
  # In other words, this would be called like this:
  #
  # Candidate.select_qualified(@candidates)
  #
  # See data.rb for the contents of @candidates

  def self.select_qualified(candidates)
    candidates.select do |candidate|
      candidate.qualified?
    end
  end

end

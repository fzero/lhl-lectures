def find(id)
  (@candidates.select {|candidate| candidate[:id] == id}).first
end

def experienced?(candidate)
  candidate[:years_of_experience] > 2
end

def knows?(candidate, language)
  candidate[:languages].include?(language)
end

def ruby_or_python?(candidate)
  knows?(candidate, 'Ruby') || knows?(candidate, 'Python')
end

def applied_recently?(candidate)
  candidate[:date_applied] >= 15.days.ago.to_date
end

def over_18?(candidate)
  candidate[:age] > 17
end

def github_points?(candidate, points)
  candidate[:github_points] > points
end

def qualified_candidates(candidates)
  candidates.select do |candidate|
    experienced?(candidate) && ruby_or_python?(candidate) &&
    applied_recently?(candidate) && over_18?(candidate) &&
    github_points?(candidate, 100)
  end
end

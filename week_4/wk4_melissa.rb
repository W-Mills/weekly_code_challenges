def duplicate_count(text)
  characters = {}

  text.downcase.each_char do |chr|
    if characters[chr]
      characters[chr] += 1
    else
      characters[chr] = 1
    end
  end

  characters.values.select{|count| count > 1}.size
end

# refactor using ternary expression
def duplicate_count(text)
  characters = {}

  text.downcase.each_char do |chr|
    characters[chr] ? characters[chr] += 1 : characters[chr] = 1
  end

  characters.values.select{|count| count > 1}.size
end

# refactor to use Hash literal
def duplicate_count(text)
  characters = text.downcase.chars.each_with_object(Hash.new(0)) do |chr, hash|
    hash[chr] += 1
  end

  characters.values.select{|count| count > 1}.size
end

# from codewars solution
def duplicate_count(text)
  ([*'a'..'z']+[*'0'..'9']).count { |c| text.downcase.count(c) > 1 }
end

puts duplicate_count("") == 0
puts duplicate_count("abcde") == 0
puts duplicate_count("abcdeaa") == 1
puts duplicate_count("abcdeaB") == 2
puts duplicate_count("Indivisibilities") == 2
puts duplicate_count("aA11") == 2

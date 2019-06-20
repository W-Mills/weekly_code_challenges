def duplicate_count(text)
  downcase_chars = text.chars.map {|char| char.downcase}

  char_frequency =
    downcase_chars.each_with_object({}) do |char, char_count|
      if char_count.keys.include?(char)
        char_count[char] += 1
      else
        char_count[char] = 1
      end
    end

  single_occurences = char_frequency.select { |_, count| count > 1 }
  single_occurences.size
end

p duplicate_count("abcde")





# input: string without special characters or spaces
#
# internal:
#   - convert string to array
#   - iterate array
#     - build up hash using each_with_object (assign return to variable)
#       {character:frequency}
#   - use to map to return array of number of key:value pairs with value == 1
#   - sum of returned array from above
#
# return: integer
#   (number of characters that occur only once)

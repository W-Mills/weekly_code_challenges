def dirReduc(directions)

  loop do
    concise_directions = []
    redundancy = false
    skip_next_direction = false

    directions.each_with_index do |direction, index|

      if skip_next_direction
        skip_next_direction = false
        next
      end

      if index == directions.size - 1
        concise_directions << direction
        break
      end

      directions_pair = [direction[0], directions[index + 1][0]]
      if redundancy?(directions_pair)
        redundancy = true
        skip_next_direction = true
        next
      else
        concise_directions << direction
      end
    end
    directions = concise_directions

    return(directions) if redundancy == false

  end

end

def redundancy?(directions_pair)
  if directions_pair[0] == directions_pair[1]
    false
  elsif directions_pair.include?("N") && directions_pair.include?("S") ||
        directions_pair.include?("E") && directions_pair.include?("W")
     true
  else
    false
  end
end

p dirReduc (['North', 'North', 'South', 'East'])

# input: - array of strings
#
# internal: - loop the following logic
#   (extract to second method?)
#   - iterate array
#   - check first letter of the current and following element
#       - if 1) their not the same AND 2) one is N and one is S
#                                   OR 3) one is E and one is W
#               next
#       - ELSE add the first element of the pair to a new array
#   - keep sending the container array to the function until no modifications
#     (need a flag to check this)
#   - once it runs throught the method without raising the flag return this array
#
#
# returns an array of strings

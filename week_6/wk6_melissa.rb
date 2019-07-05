PAIRS = { "NORTH" => "SOUTH", "EAST" => "WEST"}

def dirs_reduc(directions)
  continue = true

  while continue
    reduced = []
    directions.each_with_index do |dir, idx|
      next if reduced[idx] == 'pair'
      following = directions[idx + 1]

      if following == nil && reduced[idx + 1] != 'pair'
        reduced << dir
      elsif following == PAIRS[dir] || following == PAIRS.key(dir)
        reduced << 'pair' << 'pair'
      else
        reduced << dir
      end
    end

    if reduced.include?('pair')
      continue = true
      directions = reduced.reject{ |dir| dir == 'pair' }
    else
      continue = false  
    end
  end 

  directions
end

# p dirs_reduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]) # => ["WEST"]
# p dirs_reduc(["NORTH", "SOUTH", "EAST", "WEST"]) # => []
# p dirs_reduc(["NORTH", "EAST", "SOUTH", "WEST"]) # => ["NORTH", "EAST", "SOUTH", "WEST"]
# p dirs_reduc(["NORTH", "EAST", "WEST", "SOUTH", "WEST", "WEST"]) # => ["WEST", "WEST"]
=begin
  
rescue => exception
  
end
Input: an array of directions
Output: a "simplified" array of directions

Problem: 
  - Take an array of directions, remove the redundant directions, and return the simplified directions
  - IF 'NORTH' is followed by 'SOUTH' (OR VICE-VERSA) => remove both
  - IF 'EAST' is followed by 'WEST' (OR VICE-VERSA) => remove both
  - IF no directions remain, return an empty array
  - 

Clarifying Questions: 
  - How to decide when the directions are "simplified" ?
    - When there are no more redundant pairs
      - A 'redundant pair' is when one direction is followed by its opposite
  
Approach:
  - Recursion with a "changes" tracker that IF true => recursively calls the function

Data Structure: 
  - Mutating the original array

Algorithm: 
  - Create a hash with key-value pairs of opposites
  - Create a boolean to track if changes were made (initialize to false)
  - Use each to iterate over the list of directions from beginning to end:
    - IF the next index is an "opposites" pair (by checking reference object)
      - re-assign changes to true
      - delete both values => (delete at current index twice)
  - IF (changes were made (is true)) {
    recursively call dir_reduc with the current state of the directions array
  } 
    - ELSE: return the directions array
 
=end

def dir_reduc(directions)
  opposites = {
    'NORTH' => 'SOUTH',
    'SOUTH' => 'NORTH',
    'EAST' => 'WEST',
    'WEST' => 'EAST'
  }

  changes = false

  directions.each_with_index do |direction, index|
    next_direction = directions[index + 1]
    if direction == opposites[next_direction]
      directions.delete_at(index)
      directions.delete_at(index)
      changes = true
    end
  end

  changes ? dir_reduc(directions) : directions
end

p dir_reduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]) # 'WEST'
p dir_reduc(["NORTH", "WEST", "SOUTH", "EAST"]) # ["NORTH", "WEST", "SOUTH", "EAST"]
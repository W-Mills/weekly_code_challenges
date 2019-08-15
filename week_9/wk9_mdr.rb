claims = File.read("wk9_mdr_input.txt")
claims = claims.split(/\n/)

class SantaSuit
  attr_accessor :suit_fabric
  attr_reader :claims

  def initialize(claims)
    @claims = parse_claims(claims)
    @suit_fabric = fresh_material
    process_claims
    square_overlap_count
  end

  def parse_claims(claims)
    claims.map do |claim|
      claim_components = claim.split(' ')
      id = claim_components[0].gsub('#', '')
      from_left, from_top = claim_components[2].split(',')
      from_top = from_top.gsub(':', '')
      width, height = claim_components[3].split('x')

      {id => [from_left.to_i, from_top.to_i, width.to_i, height.to_i]}
    end
  end

  def fresh_material
    material_grid = {}
    0.upto(999) do |index|
      material_grid[index] = Array.new(1000, 0)
    end
    material_grid
  end

  def process_claims
    claims.each do |claim|
      claim.each_value do |coordinate|
        mark_used_squares(coordinate)
      end
    end

  end

  def mark_used_squares(coordinate)
    start_height_key = coordinate[1]
    end_height_key = start_height_key + coordinate[3] - 1
    start_width_index = coordinate[0]
    end_width_index = start_width_index + coordinate[2] - 1

    start_height_key.upto(end_height_key) do |row|
      start_width_index.upto(end_width_index) do |column|
        suit_fabric[row][column] += 1
      end
    end
  end

  def square_overlap_count
    overlap_count = 0

    suit_fabric.values.each do |row|
      row.each { |square| overlap_count += 1 if square > 1 }
    end

    p overlap_count
  end
end

suit = SantaSuit.new(claims)



# parse claims data
# {id => [from_left, from_top, width, height]}
#
# use OOP design to generate a 1000 x 1000 pattern
#   - 1000 hashes each contain a 1000 element array with a default value of 0
# - iterate through input data to update material squares
#   - increase number at a given square by 1 each time its used
#
# logic for marking off a claim's area
# - start point: from_top as key, from left as index
  # - need to determine range height(hash keys) and length(array indexes)

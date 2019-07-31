# frozen_string_literal: true

#
#   P
#     I:
#       - A 1000 in square of fabric (ASSUMPTION)
#       - Claims, which look like #id @ in-from-left-edge, in-from-top-edge: in-widthxin-length
#     O
#       - The number of square inches of fabric within 2 or more claims.
#     R
#       - See description of claims above
#   E
#
#   D
#     - A nested array representing the coordinates of the fabric
#     - An array of hashes with keys representing each component of a claim
#   A
#     1. Convert the input into an array of hashes, claims.
#     2. Initialize a nested array where each element represents a coordinate
#        of the fabric. The value of the element is the number of claims on the
#        that coordinate, fabric_coordinates
#     3. Increment a fabric_coordinate if it is claimed.
#     4. Count the number of elements in fabric_coordinates with a value greater
#       than 1

def convert_input_to_array(file_path)
  input_data = File.read(file_path)

  input_data.split("\n")
end

def convert_claim_array_to_hash_array(claim_array)
  claim_array.map do |claim_string|
    convert_claim_to_hash(claim_string)
  end
end

def convert_claim_to_hash(claim_string)
  split_claim = claim_string.split(' ')

  {
    id: split_claim[0].gsub('#', '').to_i,
    left: split_claim[2].split(',')[0].to_i,
    top: split_claim[2].split(',')[1].to_i,
    width: split_claim[3].split('x')[0].to_i,
    length: split_claim[3].split('x')[1].to_i
  }
end

def initialize_fabric_map(square_size)
  square_size.times.map { |_| Array.new(square_size, 0) }
end

def log_claim_on_fabric_map!(claim, fabric_map)
  claim[:left].upto(claim[:left] + claim[:width] - 1) do |x|
    claim[:top].upto(claim[:top] + claim[:length] - 1) do |y|
      fabric_map[y][x] += 1
    end
  end
end

def log_all_claims_on_fabric_map!(claims, fabric_map)
  claims.each do |claim|
    log_claim_on_fabric_map!(claim, fabric_map)
  end
end

def get_inches_with_multiple_claims(fabric_map)
  sum = 0

  fabric_map.each do |row|
    row.each do |square|
      sum += 1 if square > 1
    end
  end

  sum
end

FILE_PATH = './wk9_ido_input.txt'
raw_claim_array = convert_input_to_array(FILE_PATH)
claims = convert_claim_array_to_hash_array(raw_claim_array)

fabric_map = initialize_fabric_map(1001)

log_all_claims_on_fabric_map!(claims, fabric_map)
puts get_inches_with_multiple_claims(fabric_map)

# TEST
# claim = {
#   id: 123,
#   left: 3,
#   top: 2,
#   width: 5,
#   length: 4
# }

# fabric_map = initialize_fabric_map(11)
# log_claim_on_fabric_map!(claim, fabric_map)

# fabric_map.each do |row|
#   p row
# end

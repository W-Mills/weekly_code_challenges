# frozen_string_literal: true

#   P
#     Input:
#       - a text file comprised of strings separated
#         by new lines.
#       - each string represents a box id
#     Output:
#       - a checksum calculated by looking at all the
#         box ids in the input file.
#     Rules
#       -   # of ids containing two of the same letter
#         * # of ids containing three of the same letter
#         = checksum
#       - an id with a duplicated & triplicated letter
#         counts for both.
#       - an id with multiple duplicates still only counts
#         for one.
#   E
#     Given.
#   D
#     We can store the box ids from the file as a string
#     of arrays.
#   C
#     1. Convert the data in the input file into an array (ids)
#        of strings (box_ids).
#     2. Initialize two integer variables, double & triple, to zero
#     3. For each id in ids,
#         Increment double if id has two of the same character
#         Increment triple if id has three of the same character
#     4. Multiply double & triple.

def convert_input_to_array(file_path)
  input_data = File.read(file_path)

  input_data.split("\n")
end

def count_chars_until(string, limit)
  string.chars.each do |letter|
    return true if string.count(letter) == limit
  end

  false
end

def calculate_checksum(box_ids)
  doubles = 0
  triples = 0

  box_ids.each do |box_id|
    doubles += 1 if count_chars_until(box_id, 2)
    triples += 1 if count_chars_until(box_id, 3)
  end

  doubles * triples
end

FILE_PATH = './wk8_ido_input.txt'
box_ids = convert_input_to_array(FILE_PATH)

puts calculate_checksum(box_ids)

# This is the non-optimized solution - for comparison purposes only!

input = File.read('./input.txt')

def convert_to_array(string)
  string.split("\n").map(&:to_i)
end

def find_duplicate(string)
  frequency_changes = convert_to_array(string)
  frequencies = []
  index = 0
  current_frequency = 0

  loop do
    current_frequency += frequency_changes[index]
    return current_frequency if frequencies.include?(current_frequency)
    frequencies << current_frequency
    index += 1
    index = 0 if index == frequency_changes.size
  end
end

p find_duplicate(input)

# frozen_string_literal: true

INPUT_FILE = './wk7_ido_input.txt'
device_inputs = File.read(INPUT_FILE).split

frequency = device_inputs.reduce(0) do |sum, current|
  number = current[1..].to_i
  multiply_by = (current[0] == '+' ? 1 : -1)

  sum + (number * multiply_by)
end

puts frequency

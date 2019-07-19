# frozen_string_literal: true

## Read File
INPUT_FILE = './wk7_ido_input.txt'
raw_device_inputs = File.read(INPUT_FILE).split
device_inputs = raw_device_inputs.map(&:to_i)

## PART 1
def frequency_changes(device_inputs)
  sum = 0

  device_inputs.map { |freq| sum += freq }
end

def final_frequency(device_inputs)
  frequency_changes(device_inputs)[-1]
end

puts final_frequency(device_inputs)

## PART 2

## so much faster than an array
def sum_until_duplicate(array)
  sums = {}
  sum = 0

  loop do
    array.each do |element|
      sum += element
      return sum if sums.key?(sum)

      sums[sum] = nil
    end
  end
end

puts sum_until_duplicate(device_inputs.map(&:to_i))

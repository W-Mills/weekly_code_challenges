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

## brute force
def sum_until_duplicate(array)
  sums = []
  sum = 0

  loop do
    array.each do |element|
      sum += element
      return sum if sums.include?(sum)

      sums << sum
    end
  end
end

# puts sum_until_duplicate(device_inputs.map(&:to_i))

## second attempt
def frequency_pairs(device_inputs)
  frequencies = frequency_changes(device_inputs)
  final_frequency = final_frequency(device_inputs)

  pairs = []
  distance = 1

  loop do
    first_index = 0
    loop do
      first_element = frequencies[first_index]
      second_index = first_index + distance
      second_element = frequencies[second_index]
      range = second_element - first_element

      if (range % final_frequency).zero?
        if (range / final_frequency).positive?
          index_to_save = first_index
          sum_to_save = second_element
        else
          index_to_save = second_index
          sum_to_save = first_element
        end

        pairs << {
          index: index_to_save,
          sum: sum_to_save,
          distance: range.abs
        }
      end

      first_index += 1
      break if first_index >= frequencies.length - distance
    end

    distance += 1
    break if distance >= frequencies.length
  end

  pairs
end

def first_repeated_sum(pairs)
  first_pair = pairs.min_by do |pair|
    [pair[:distance], pair[:index]]
  end

  first_pair[:sum]
end

pairs = frequency_pairs(device_inputs)
p first_repeated_sum(pairs)

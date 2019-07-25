box_ids = File.read("wk8_mdr_input.txt")
box_ids = box_ids.split(/\s/).map(&:chars)

total_repeats = {pairs: 0, triplets: 0}

box_ids.each do |box_id|
  box_char_count = box_id.each_with_object({}) do |char, log|
    log[char] ? log[char] += 1 : log[char] = 1
  end

  total_repeats[:pairs] += 1 if box_char_count.values.include?(2)
  total_repeats[:triplets] += 1 if box_char_count.values.include?(3)


  # box_char_count.values.each do |frequency|
  #   total_repeats[:pairs] += 1 if frequency == 2
  #   total_repeats[:triplets] += 1 if frequency == 3
  # end

end

p total_repeats[:pairs] * total_repeats[:triplets]

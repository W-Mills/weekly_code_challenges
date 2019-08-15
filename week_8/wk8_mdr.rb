box_ids = File.read("wk8_mdr_input.txt")
box_ids = box_ids.split(/\s/).map(&:chars)

# part one

total_repeats = {pairs: 0, triplets: 0}

box_ids.each do |box_id|
  box_char_count = box_id.each_with_object({}) do |char, log|
    log[char] ? log[char] += 1 : log[char] = 1
  end

  total_repeats[:pairs] += 1 if box_char_count.values.include?(2)
  total_repeats[:triplets] += 1 if box_char_count.values.include?(3)
end

total_repeats[:pairs] * total_repeats[:triplets]

# part two

def find_similar_ids(box_ids)
  similar_ids = []

  box_ids.each_with_index do |id, index|
    box_ids[(index + 1)...].each do |id2|
      number_errors = 0
      id.each_with_index do |character, index_inner|
        if character != id2[index_inner]
          number_errors += 1
        end
      end
      if number_errors <= 1
        similar_ids.push([id, id2])
      end
    end
  end

  similar_ids
end

def matching_id_characters(pair_ids)
  pair_ids.flatten!(1)
  common_characters = []

  pair_ids[0].each_with_index do |character, index|
    if character == pair_ids[1][index]
      common_characters.push(character)
    end
  end

  common_characters.join
end

pair_ids = find_similar_ids(box_ids)
matching_id_characters(pair_ids)

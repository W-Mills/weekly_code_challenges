input = File.read('ryan_input.txt').split("\n")


# PART 1
test_input = ["abcdef", "bababc", "abbcde", "abcccd", "aabcdd", "abcdee", "ababab"]

def checksum(array)
  twice_count = 0
  thrice_count = 0

  array.each do |string|
    thrice_count += 1 if string.chars.any? { |char| string.count(char) == 3 }

    twice_count += 1 if string.chars.any? { |char| string.count(char) == 2 }
  end

  twice_count * thrice_count
end

p checksum(test_input) == 12
p checksum(input) == 8118


# PART 2
test_input = ["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"]

def common_chars(array)
  index_tar = 0
  index_chk = 1
  found = nil

  loop do
    target = array[index_tar]

    loop do
      check = array[index_chk]
      index = 0
      diff_count = 0
        loop do
          diff_count += 1 if target[index] != check[index]
          index += 1
          break if index >= target.length
        end
      found = [target, check] if diff_count == 1
      index_chk += 1
      break if index_chk >= array.length
    end

    index_tar += 1
    index_chk = index_tar + 1
    break if index_chk >= array.length
  end

  arr1 = found[0].chars
  arr2 = found[1].chars

  arr1.each_with_index do |char, index|
    if char != arr2[index]
      arr1.delete(char)
      break
    end
  end

  arr1.join('')
end

p common_chars(test_input) == "fgij"
p common_chars(input) == "jbbenqtlaxhivmwyscjukztdp"

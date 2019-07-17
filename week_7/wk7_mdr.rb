frequencies = File.read("wk7_mdr_input.txt")
frequencies = frequencies.split(/\s/).map(&:to_i)
frequencies.sum

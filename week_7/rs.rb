require 'pry'
require 'set'
# Part 1 - working solution

input = File.read('./day1_raw.txt')

directions = input.split("\n").map { |direction| direction.to_i }

# def frequency_finder(array)
#   sum = 0

#   array.each { |direction| sum += direction }

#   sum
# end

# p frequency_finder(directions) == 500
# p frequency_finder([1, 1, 1]) == 3
# p frequency_finder([1, 1, -2]) == 0
# p frequency_finder([-1, -2, -3]) == -6
# p frequency_finder([1, -2, 3, 1]) == 3


#Part 2 - working solution but too slow

# def frequency_finder(array)
#   sum = 0
#   frequencies = [0]
#   count = 0

#   loop do
#     array.each do |direction| 
#       sum += direction
#       frequencies << sum
#       break if frequencies.count(sum) == 2
#     end
#     count += 1
#     break if frequencies.count(sum) == 2
#   end

#   frequencies[-1]
# end

# Part 2a - I got it to run fast; I used a set instead of an array to keep track of the frequencies I've already seen. I'm still curious about how to optimize the use of an array and if it's possible.

def frequency_finder(array)
  sum = 0
  frequencies = Set[0]
  found = false

  loop do
    array.each do |direction| 
      sum += direction
      if frequencies.include?(sum)
        found = true
        break
      end
      frequencies << sum
    end
    break if found
  end

  sum
end

p frequency_finder([1, -1]) #== 0
p frequency_finder([3, 3, 4, -2, -4]) #== 10
p frequency_finder([-6, 3, 8, 5, -6]) #== 5
p frequency_finder([7, 7, -2, -7, -4]) #== 14
p frequency_finder(directions)
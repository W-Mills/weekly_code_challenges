require 'pry'
# Part 1 - working solution

input = File.read('./day1_raw.txt')

directions = input.split("\n").map { |direction| direction.to_i }

def frequency_finder(array)
  sum = 0

  array.each { |direction| sum += direction }

  sum
end

p frequency_finder(directions) == 500
p frequency_finder([1, 1, 1]) == 3
p frequency_finder([1, 1, -2]) == 0
p frequency_finder([-1, -2, -3]) == -6
p frequency_finder([1, -2, 3, 1]) == 3


#Part 2 - working solution but too slow

# def frequency_finder(array)
#   sum = 0
#   frequencies = [0]
#   count = 0

#   loop do
#     array.each do |direction| 
#       sum += direction
#       frequencies << sum
#       # binding.pry
#       break if frequencies.count(sum) == 2
#     end
#     count += 1
#     break if frequencies.count(sum) == 2
#   end

#   frequencies[-1]
# end

# Part 2 - Trying to get a faster working solution. I don't understand how binary search works.

# def frequency_finder(array)
#   sum = 0
#   frequencies = [0]
#   count = 0
#   found = false

#   loop do
#     array.each do |direction| 
#       sum += direction
#       # binding.pry
#       if frequencies.bsearch { |x| x == sum }
#         found = true
#         break
#       end
#       frequencies << sum
#     end
#     count += 1
#     break if found
#   end

#   sum
# end

# p frequency_finder([1, -1]) #== 0
# p frequency_finder([3, 3, 4, -2, -4]) == 10
# p frequency_finder([-6, 3, 8, 5, -6]) #== 5
# p frequency_finder([7, 7, -2, -7, -4]) == 14
# # p frequency_finder(directions)



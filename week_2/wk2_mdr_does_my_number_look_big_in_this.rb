# solution as per code wars problem description
def narcissistic(value)
  digits = value.to_s.chars.map { |digit| digit.to_i }

  new_digits = digits.map { |digit| digit ** digits.size}

  new_digits.sum == value
end

# solution for added problem description: raise each digit of the argument by its position in the number
#
# def narcissistic(value)
#   digits = value.to_s.chars.map { |digit| digit.to_i }
#
#   digits_reversed= digits.reverse
#
#   new_digits = []
#
#   1.upto(digits.size) { |base| new_digits << digits_reversed[base-1] ** base }
#
#   new_digits.sum == value
## end


# pseudocode
#
# input: integer
#
# internal:
#   - sum of:
#     - each digit raised to the power of it's position in input number (base 10)
#
#       - divide number into digits
#         - iterate digits from right to left with a counter starting at 1 indicating
#         it's position according to its base
#
#   - verify if sum is equal to input
# output: boolean

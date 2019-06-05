def narcissistic?(value)
  digits = value.digits
  digits.map { |digit| digit ** digits.size }.sum == value
end

puts narcissistic?(153)
puts narcissistic?(1634)
puts narcissistic?(1635)

def narcissistic?(value)
  sum = 0
  digits = value.digits
  digits.each do |digit|
    sum += (digit**digits.size)
  end
  sum == value
end



def narcissistic?(value)
  value_length = value.to_s.length
  
  sum_of_digits = value.digits
    .map{ |digit| digit ** value_length }
    .reduce(&:+)
    
  value == sum_of_digits
end

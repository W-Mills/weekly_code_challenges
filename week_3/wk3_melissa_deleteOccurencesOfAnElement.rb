def delete_nth(array, integer)
  array.each_with_object([]) do |number, result|
    result << number if result.count(number) < integer
  end
end

puts delete_nth([1,1,1,1],2) == [1,1]
puts delete_nth([20,37,20,21],1) == [20,37,21]

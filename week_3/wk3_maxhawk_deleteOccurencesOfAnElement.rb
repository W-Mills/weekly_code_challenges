# Given a list lst and a number N, create a new list that contains each number of lst at most N times without reordering. For example if N = 2, and the input is [1,2,3,1,2,1,2,3], you take [1,2,3,1,2], drop the next [1,2] since this would lead to 1 and 2 being in the result 3 times, and then take 3, which leads to [1,2,3,1,2,3].

=begin
  input: array, integer limit
  output: array
  initialize a result_array []
  initialize a hash to count occurences
  loop through input_array
    increment hash[el]
    if hash[el] < 2, add el to result array
  return result array
=end

def delete_nth(order, max_e)
  result = []
  occurrences = Hash.new(0)

  order.each do |el|
    occurrences[el] += 1
    result << el unless occurrences[el] > max_e
  end

  result
end

p delete_nth([1,1,1,1], 2) # return [1,1]

p delete_nth([20,37,20,21], 1) # return [20,37,21]

def delete_nth(order,max_e)
  order.each_with_object([]) do |motive, concise_collection|
    concise_collection << motive unless concise_collection.count(motive) == max_e
  end
end

# def delete_nth(order,max_e)
#   return_array = []
#   order.each do |motive|
#     return_array << motive unless return_array.count(motive) == max_e
#   end
#   return_array
# end

p delete_nth([1,1,1,1],2)
p delete_nth([20,37,20,21],1)

# input: 2 arguments
#   - array of integers
#   - integer
#
# internal
#   - instantiate new array
#   - iterate argument array
#     - add element to new array unless there is already max amount
#         of frequence of this element (extract to a 2nd method?)
#   - return new array
#
# return: array where no more than 2nd argument of occurences
#  of one value in the array

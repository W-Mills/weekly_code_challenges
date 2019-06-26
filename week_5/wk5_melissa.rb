# break original array into chunks of 8 digits
#   - convert to a string to be able to use regex
#   - use scan for ruby, match for javascript
# reverse the order of those chunks
# flatten into a single array

def data_reverse(data)
  data.join.scan(/.{8}/).reverse.join.split('').map {|digit| digit.to_i }
end

array1 = [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,0,1,0]
p data_reverse(array1)
# output = [1,0,1,0,1,0,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]

array2 = [0,0,1,1,0,1,1,0,0,0,1,0,1,0,0,1]
p data_reverse(array2)
# output = [0,0,1,0,1,0,0,1,0,0,1,1,0,1,1,0]

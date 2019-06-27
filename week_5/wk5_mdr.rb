def data_reverse(data)
  bytes = []

  data.each_with_index do |bit, index|
    if (index)%8 == 0
      byte = []
      8.times { |sub_index| byte << data[index + sub_index]}
      bytes << byte
    end
  end

  bytes.reverse.flatten
end


# input: array of integers
#
# internal:
# - instantiate empty container array
#
# - determine how many bytes: data.size / 8
#
# - divide each chunk of 8 elements into a subarray
#   - iterate array with each_with_index
#     - nested iteration 8.times do... to create sub-arrays that are added to
#       the container array
#
# - reverse the order of these subarrays (of container array)
# - flatten (container) array

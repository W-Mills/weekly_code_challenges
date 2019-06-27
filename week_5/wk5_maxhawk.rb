def data_reverse(data)
  reverse_data = []
  loop do
    reverse_data.unshift(data.slice!(0, 8).flatten)
    return reverse_data.flatten if data.length.zero?
  end
end


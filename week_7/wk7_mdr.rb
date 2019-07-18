frequencies = File.read("wk7_mdr_input.txt")
frequencies = frequencies.split(/\s/).map(&:to_i)

first_net_frequency = 0
net_frequency_log = {0=>true}

def find_first_repeat_frequency(input_frequencies, net_frequency, log)
  loop do
    input_frequencies.each do |frequency|
      net_frequency += frequency

      return(net_frequency) if log[net_frequency]

      log[net_frequency] = true
    end
  end
end

p find_first_repeat_frequency(frequencies, first_net_frequency, net_frequency_log)

# loop do
#   frequencies.each do |frequency|
#     net_frequency += frequency
#     if net_frequency_log.include?(net_frequency)
#       first_repeated_frequency = net_frequency
#       break
#     end
#     net_frequency_log << net_frequency
#   end
#   break if first_repeated_frequency
# end

# p first_repeated_frequency

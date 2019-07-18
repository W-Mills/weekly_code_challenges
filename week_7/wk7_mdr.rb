frequencies = File.read("wk7_mdr_input.txt")
frequencies = frequencies.split(/\s/).map(&:to_i)

net_frequency = 0
net_frequency_log = [0]
first_repeated_frequency = nil

loop do
  frequencies.each do |frequency|
    net_frequency += frequency
    if net_frequency_log.include?(net_frequency)
      first_repeated_frequency = net_frequency
      break
    end
    net_frequency_log << net_frequency
  end
  break if first_repeated_frequency
end

first_repeated_frequency

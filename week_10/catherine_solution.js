var fs = require('fs');
var input = chomp(fileRead('input.txt')).split('\n');
var logEntries = input.map(parseEntry).sort(sortByDate);
var guards = fetchData(logEntries);

analyzeData(guards);

console.log(solution1(guards)); // 20859
console.log(solution2(guards)); // 76576

//-----------------------------------------------------------

function fileRead(filename) {
  var contents = fs.readFileSync(filename);
  return contents.toString();
}

function chomp(text) {
  return text.replace(/(\n)+$/, '');
}

function parseEntry(entry) {
  var date = entry.match(/\[.+\]/g)[0].replace(/\[|\]/g, '');
  var timestamp = new Date(date);
  var id = entry.match(/#\d+/g);
  var action = entry.match(/asleep|wakes/g);

  return {
    timestamp: timestamp,
    minute: timestamp.getMinutes(),
    id: id ? id[0].slice(1) : undefined,
    action: action ? action[0] : undefined,
  };
}

function sortByDate(a, b) {
  return a.timestamp - b.timestamp;
}

function fetchData(entries) {
  var guards = {};
  var id;
  var minuteAsleep;
  var minuteAwake;

  entries.forEach((entry) => {
    if (entry.id) {
      id = entry.id;
    } else if (entry.action == 'asleep') {
      minuteAsleep = entry.minute;
    } else if (entry.action == 'wakes') {
      minuteAwake = entry.minute;
      let time = minuteAwake - minuteAsleep;
      let minutes = getMinutesAsleep(minuteAsleep, minuteAwake);
      updateData(guards, id, time, minutes);
    }
  });

  return guards;
}

function getMinutesAsleep(start, stop) {
  var minutes = [];

  for (let i = start; i < stop; i += 1) {
    minutes.push(i);
  }

  return minutes;
}

function updateData(guards, id, time, minutes) {
  if (!guards[id]) guards[id] = { id: id, count: {}, total: 0 };

  var guard = guards[id];

  guard.total += time;

  minutes.forEach((min) => {
    guard.count[min] ? guard.count[min] += 1 : guard.count[min] = 1;
  });
}

function analyzeData(guards) {
  Object.keys(guards).forEach((id) => {
    let guard = guards[id];
    guard.mostAsleep = findMinuteMostAsleep(guard.count);
  });
}

function findMinuteMostAsleep(count) {
  var sortedMinutes = Object.keys(count).sort((a, b) => {
    if (count[a] > count[b]) {
      return -1;
    } else if (count[a] < count[b]) {
      return 1;
    } else {
      return 0;
    }
  });

  var minuteMostAsleep = sortedMinutes[0];

  return {
    minute: Number(minuteMostAsleep),
    times: Number(count[minuteMostAsleep]),
  };
}

function solution1(guards) {
  var sortedIDs = Object.keys(guards).sort((a, b) => {
    return guards[b].total - guards[a].total;
  });

  var sleepyGuard = guards[sortedIDs[0]];

  return sleepyGuard.id * sleepyGuard.mostAsleep.minute;
}

function solution2(guards) {
  var sortedIDs = Object.keys(guards).sort((a, b) => {
    return guards[b].mostAsleep.times - guards[a].mostAsleep.times;
  });

  var sleepyGuard = guards[sortedIDs[0]];

  return sleepyGuard.id * sleepyGuard.mostAsleep.minute;
}

// Find the guard that has the most minutes asleep. What minute does that guard spend asleep the most?

// In the example above, Guard #10 spent the most minutes asleep, a total of 50 minutes (20+25+5), while Guard #99 only slept for a total of 30 minutes (10+10+10). Guard #10 was asleep most during minute 24 (on two days, whereas any other minute the guard was asleep was only seen on one day).

// While this example listed the entries in chronological order, your entries are in the order you found them. You'll need to organize them before they can be analyzed.

// What is the ID of the guard you chose multiplied by the minute you chose? (In the above example, the answer would be 10 * 24 = 240.)

/*
Input: list of datetimes:
  {guardID} begins shift
  guard falls asleep
  guard wakes up
- datetimes are not sorted
- when sorted, each 'wake up/fall asleep' status applies to the guardID who has most recently started their shift

Output: Number, the ID of guard who has slept the most minutes * the minute they slept the most

Map the list into list of event objects:
eventLog =  {
    timestamp:
    guardId:
    action:
  }

Sort the list by timestamp

Create guardLog obj
guardLog = {
  guardId1: [0..59] (60 item array, indexes represent minute past midnight, value is count of sleep minutes),
  guardId2: [0..59] (60 item array),
}

Build guardLog
Iterate through list
  if event[guardId], set currentGuard
  else:
    if event[action] === falls asleep, set sleepTime
    if event[action] === wakes up, then logSleep(guardLog, currentGuard, startTime, wakeTime)
      - logSleep
        from t = startTime to wakeTime
          guardLog[currentGuard][t] += 1 || 1

Part 1:
Find sleepiest guard
create a sleepyGuards obj
get List of guardIDs in guardLog
  sleepyGuards[guard] = guardID
  sleepyGuards[sleepSum] = guardLog[guardID].reduce(sum)
  sleepyGuards[sleepyMinute] = guardLog[guardID].reduce(maxIdx, minutes, idx)
  For each guardId
    - reduce sleepLog to sleepSum
  Sort list of guardIds by sleepSum
    - sleepiestGuardId = highest id

Return Number(sleepistGuardID) * guardLog[sleepist].indexOf(maxValue)

Part 2:
sort guards by highest value of each guardlog[guardId] array
get that guard
get their sleepiest minute

*/

function parseFile(filename) {
  const fs = require('fs');
  let data = fs.readFileSync(filename, 'utf8');
  return data.split("\n").slice(0,-1);
}

function createEventLog(eventList) {
  let eventObj;
  let timeStamp;
  let gid;
  let action;

  return eventList.map(function(eventStr) {
    timeStamp = new Date(eventStr.match(/\[(.+)\]/)[1]);
    gid = eventStr.match(/#(\d+)/) || [];
    action = eventStr.match(/(begins shift|falls asleep|wakes up)/g);
    eventObj = {
      timestamp: timeStamp,
      guardId: gid[1],
      action: action[0],
    }
    return eventObj;
  })
}

function sortByDateTime(eventA, eventB) {
  return eventA.timestamp.getTime() - eventB.timestamp.getTime();
}


function logSleep(guardLog, guard, startTime, endTime) {
  let t;

  if(!guardLog[guard]) {
    guardLog[guard] = [];
  }

  for (t = startTime; t < endTime; t += 1) {
    guardLog[guard][t] = guardLog[guard][t] + 1 || 1;
  }
}

function createGuardLog(eventLog) {
  let currentGuard;
  let sleepTime;
  let wakeTime;
  let guardLog = {};
  eventLog.forEach(function(event) {
    if(event.action === 'begins shift') {
      currentGuard = event.guardId;
    } else if (event.action === 'falls asleep') {
      sleepTime = event.timestamp.getMinutes();
    } else if (event.action === 'wakes up') {
      wakeTime = event.timestamp.getMinutes();
      logSleep(guardLog, currentGuard, sleepTime, wakeTime);
    }
  })

  return guardLog;
}

function sleepStrategy1(guardIdA, guardIdB) {
  let sleepSumA = guardLog[guardIdA].reduce((sum, cur) => sum + cur);
  let sleepSumB = guardLog[guardIdB].reduce((sum, cur) => sum + cur);

  return sleepSumA - sleepSumB;
}

function sleepStrategy2(guardIdA, guardIdB) {
  let maxSleepA = Math.max(...guardLog[guardIdA].filter((el) => el !== undefined));
  let maxSleepB = Math.max(...guardLog[guardIdB].filter((el) => el !== undefined));

  return maxSleepA - maxSleepB;
}

function analyzeSleep(guardLog, strategy) {
  let sleepiestGuard;
  let sleepiestMinute;
  let mostSleep;
  let allGuards = Object.keys(guardLog);

  allGuards.sort(strategy);

  sleepiestGuard = allGuards[allGuards.length - 1];
  mostSleep = Math.max(...guardLog[sleepiestGuard].filter(el => el !== undefined));
  sleepiestMinute = guardLog[sleepiestGuard].indexOf(mostSleep);
  return {
          id: Number(sleepiestGuard),
          minute: Number(sleepiestMinute),
          };
}

// Begin program
let eventLog = createEventLog(parseFile('maxhawk_input.txt'));
eventLog.sort(sortByDateTime);
let guardLog = createGuardLog(eventLog);

let firstSleepyGuard = analyzeSleep(guardLog, sleepStrategy1);
console.log('The first result is: ', firstSleepyGuard.id * firstSleepyGuard.minute)


let secondSleepyGuard = analyzeSleep(guardLog, sleepStrategy2);
console.log('The second result is: ', secondSleepyGuard.id * secondSleepyGuard.minute)



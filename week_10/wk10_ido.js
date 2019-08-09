/*
P
  I
    - A text file of strings, each of which
      is on its own line & represents a log
      of times between 00:00 - 01:00 when guards 
      start their shift, fall asleep, and wake up
  O
    - the ID of the guard who slept the most number 
      of minutes multiplied by the minute that guard 
      was asleep most often.
E
  Given
D
  
A
  1. Convert the text file into an array of strings
  2. Convert each string into an object, guardSleepTracker:
      {
        guardId: guardId,
        asleepAt: [0, 1, 0, 0]
      }
      a. Group the records by date
      b. 1. Log each time as minutes before / after midnight of that date
          2. Indicate whether a log reflects a wake up or sleep event
      c. Assign a guard id to each date 
      d. Sort the entries by date & minutesSinceMidnight
      e. For each guard, create a 60 element array of 0s
      f. For each event on a date, when a guard falls asleep
          increment that minute by 1 and then keep incrementing the
          minutes until we reach the minute that the guard woke up.
  3.  For each guard's array, sum the values to find the 
      array with the largest ones. This represents the 
      guard that slept the most.
  4. For that guard's array, find the largest element. This
      represents the guard's sleepiest minute.
  5. Multiply the sleepiest guard's id by the guard's
      sleepiest minute.
*/

const INPUT_FILE = 'wk10_ido_input.txt';

function convertFileToStringArray(filename) {
  let fs = require('fs');
  let data = fs.readFileSync(filename, "UTF-8");
  return chomp(data).split("\n");
}

function chomp(text) {
  return text.replace(/\n$/, "");
}

function convertArrayToEntries(arrayOfStringEntries) {
  return arrayOfStringEntries.map(convertLogToObject);
}

function convertLogToObject(logString) {
  let logParts = logString.substring(1).split('] ');
  let logDateData = parseDate(logParts[0]);
  let logText = logParts[1];
  let idMatch = logText.match(/\d+/);
  
  return {
    id: idMatch && idMatch[0],
    logDate: logDateData.logDate,
    minutesSinceMidnight: logDateData.minutesSinceMidnight,
    logEvent: parseText(logText)
  };
  
  function parseDate(logDateString) {
    [year, month, day, hour, minute] = logDateString.match(/\d+/g).map(Number);
    let minutesSinceMidnight = minute;
    let logDate = new Date(year, month - 1, day);

    if (hour >= 23) {
      logDate.setDate(logDate.getDate() + 1);
      minutesSinceMidnight = minute - 60;
    }
    
    return { logDate, minutesSinceMidnight }
  }
  
  function parseText(logText) {
    if (logText.includes('begins')) {
      return 'begins';
    } else if (logText.includes('asleep')) {
      return 'sleeps';
    } else {
      return 'awake';
    }
  }
}

function logGuardSleepTimes(logEntries) {
  let guardEntries = {};
  let lastDate = undefined;
  let guardId = undefined;
  let asleepAt = undefined
  
  logEntries.forEach( (entry) => {
    if (entry.logDate.getTime() !== (lastDate && lastDate.getTime())) {
      updateEntryIdentifiers(entry);
    }
    
    if (entry.logEvent === 'sleeps') {
      asleepAt = entry.minutesSinceMidnight;
    } else if (entry.logEvent === 'awake') { 
      incrementValuesInArray(guardEntries[guardId], asleepAt, entry.minutesSinceMidnight);
      asleepAt = undefined;
    }
  });
  
  return guardEntries;
  
  function updateEntryIdentifiers(entry) {
    guardId = entry.id;
    lastDate = entry.logDate;

    if (!guardEntries.hasOwnProperty(guardId)) {
      guardEntries[guardId] = Array(60).fill(0);
    }
  }
}

function incrementValuesInArray(array, startAt, endAt) {
  for (let i = startAt; i < endAt; i++) {
    array[i] += 1;
  }
}

function summarizeGuardSleepMinutes(guardId, guardSleepMinutes) {
  let totalMinutesAsleep = guardSleepMinutes.reduce((sum, minutesAsleep) => {
    return sum + minutesAsleep;
  });

  let sleepiestMinuteData = guardSleepMinutes.reduce((max, minutesAsleep, minuteSinceMidnight) => {
    return minutesAsleep > (max.minutesAsleep || 0) ? { minutesAsleep, minuteSinceMidnight } : max;
  });

  return {
    id: guardId,
    totalMinutesAsleep,
    sleepiestMinute: sleepiestMinuteData.minuteSinceMidnight || 0,
    sleepCount: sleepiestMinuteData.minutesAsleep
  }
}

function summarizeAllGuardSleepMinutes(allGuardSleepMinutes) {
  return Object.keys(guardSleepMinutes).map(guardId => {
    return summarizeGuardSleepMinutes(guardId, allGuardSleepMinutes[guardId]);
  });
}

function findSleepiestGuard(summarizedGuardSleepMinutes) {
  return summarizedGuardSleepMinutes.reduce( (sleepiestGuard, guard) => {
    return sleepiestGuard.totalMinutesAsleep > guard.totalMinutesAsleep ? sleepiestGuard : guard;
  });
}

function calculateSleepiestGuardChecksum(sleepiestGuardData) {
  return Number(sleepiestGuardData.id) * sleepiestGuardData.sleepiestMinute;
}

let data = convertFileToStringArray(INPUT_FILE)
let logEntries = convertArrayToEntries(data);
logEntries.sort( (a, b) => a.logDate - b.logDate || a.minutesSinceMidnight - b.minutesSinceMidnight);

let guardSleepMinutes = logGuardSleepTimes(logEntries);
let summarizedGuardSleepMinutes = summarizeAllGuardSleepMinutes(guardSleepMinutes);
let sleepiestGuard = findSleepiestGuard(summarizedGuardSleepMinutes);
let sleepiestGuardChecksum = calculateSleepiestGuardChecksum(sleepiestGuard);

console.log(sleepiestGuardChecksum);

//

function findGuardWithSleepiestMinute(summarizedGuardSleepMinutes) {
  return summarizedGuardSleepMinutes.reduce((sleepiestGuard, guard) => {
    return sleepiestGuard.sleepCount > guard.sleepCount ? sleepiestGuard : guard;
  });
}

let guardWithSleepiestMinute = findGuardWithSleepiestMinute(summarizedGuardSleepMinutes);
let sleepiestMinuteChecksum = calculateSleepiestGuardChecksum(guardWithSleepiestMinute);
console.log(sleepiestMinuteChecksum);

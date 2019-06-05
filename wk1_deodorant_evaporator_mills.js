// This program tests the life of an evaporator containing a gas.

// We know the content of the evaporator(content in ml), the percentage of foam or gas lost every day(evap_per_day) and the threshold(threshold) in percentage beyond which the evaporator is no longer useful.All numbers are strictly positive.

// The program reports the nth day(as an integer) on which the evaporator will be out of use.

//   Note : Content is in fact not necessary in the body of the function "evaporator", you can use it or not use it, as you wish.Some people might prefer to reason with content, some other with percentages only.It's up to you but you must keep it as a parameter because the tests have it as an argument.

//-----------------------------------------------------------------------------

// know the content in ml of the evaporator (content)
// know the percentage of foam or gas lost every day (evap_per_day)
// know the threshold in percentage beyond which the evaporator is no longer useful (threshold)
//-----------------------------------------------------------------------------

// INIT VAR currentContent to track current content level
// INIT VAR breakpoint to the ml content at which evaporator is useless
// INIT VAR days to track how many days to decay

// LOOP ON CONDITION (currentContent is GREATER THAN breakpoint)
// CALCULATE the ml of current day's evaporation (currentContent * (evapPerDay / 100) )
// SUBTRACT the daily evaporation from the currentContent
// INCREMENT the number of days by 1
// RETURN num days when itereation is finished
// 

function evaporator(content, evapPerDay, threshold) {
  let currentContent = content;
  let breakpoint = content * (threshold / 100);
  let days = 0;

  while (currentContent > breakpoint) {
    let dailyEvap = currentContent * (evapPerDay / 100);
    currentContent -= dailyEvap;
    days += 1;
  }
  return days;
}


evaporator(10,10,10) // => 22;



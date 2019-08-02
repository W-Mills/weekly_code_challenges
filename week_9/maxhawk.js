// The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side.

// Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. All claims have an ID and consist of a single rectangle with edges parallel to the edges of the fabric. Each claim's rectangle is defined as follows:

// The number of inches between the left edge of the fabric and the left edge of the rectangle.
// The number of inches between the top edge of the fabric and the top edge of the rectangle.
// The width of the rectangle in inches.
// The height of the rectangle in inches.

// If the Elves all proceed with their own plans, none of them will have enough fabric. How many square inches of fabric are within two or more claims?

/*
Input: list of claims
Output: Number, count of square inches within two or more claims

1. Break apart each claim string into its component parts:
- claimNum
- leftPos
- topPos
- width
- height

2. Represent the 1000x1000 piece of cloth
- 1000x1000 matrix
  - each position on the matrix represents a count of the claims
  - each element starts at 0
  - element is iterated if claimed

3. Represent the number of claims of each square inch of cloth

4. After all claims made
  - reduce the matrix, counting the number of elements with value 2 or greater

Algo
- initialize a 1000x1000 cloth matrix, with all elements = 0
- break down our claim string
  - for each claim
    - regex match #1 @ 265,241: 16x26
    - assign match groups to leftPos, topPos, width, heigh
    - for i = leftPos to width
      - for j = topPos to height
        cloth[i][j] += 1
- reduce cloth matrix to count of elements >= 2
  - matrix.reduce(count, row => row.reduce (count, square) return count + 1 || count )
*/

function parseFile(filename) {
  const fs = require('fs');
  let data = fs.readFileSync(filename, 'utf8');
  return data.split("\n").slice(0,-1);
}

function parseClaim(claimStr) {
  let re = /\#(\d+) \@ (\d+),(\d+)\: (\d+)x(\d+)/
  return claimStr.match(re).map(Number).slice(1, 6);
}

function newCloth() {
  let cloth = [];
  for (let i = 0; i < 1000; i += 1) {
    cloth.push([]);
  }

  return cloth;
}

function findMultiClaims(cloth) {
  let rowCount;
  let counter = (count, square) => {
    return (square.length >= 2) ? count + 1 : count;
  };

  let multiClaimCount = cloth.reduce(function (count, row) {
    rowCount = row.reduce(counter, 0);
    return count + rowCount;
  }, 0);

  return multiClaimCount;
}

function findFreeClaim(cloth, claimsList) {
  let freeClaim;
  let leftPos;
  let topPos;
  let width;
  let height;
  let i;
  let j;

  freeClaim = claimsList.filter(function(claimData) {
    [leftPos, topPos, width, height] = claimData.slice(1);

    for (i = leftPos; i < leftPos + width; i += 1) {
      for (j = topPos; j < topPos + height; j += 1) {
       if (cloth[j][i].length > 1) return false;
      }
    }

    return true;
  });

  return freeClaim[0];
}

function inspectClaims(claimsList) {
  let claimId;
  let leftPos;
  let topPos;
  let width;
  let height;
  let i;
  let j;
  let cloth = newCloth();

  claimsList = claimsList.map(parseClaim);

  claimsList.forEach(function(claimData) {
    [claimId, leftPos, topPos, width, height] = claimData;

    for (i = leftPos; i < leftPos + width; i += 1) {
      for (j = topPos; j < topPos + height; j += 1) {
        if (cloth[j][i]) {
          cloth[j][i].push(claimId)
        } else {
          cloth[j][i] = [claimId];
        }
      }
    }
  })

  console.log(findMultiClaims(cloth));
  console.log(findFreeClaim(cloth, claimsList));
}

let claims = parseFile('maxhawk_input.txt');
inspectClaims(claims);
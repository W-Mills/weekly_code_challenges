var fs = require('fs');
var input = chomp(fileRead('catherine_input.txt')).split('\n');
var claims = input.map(parseClaim);
var claimedFabric = mapCoordinates(claims);
var overlaps = findOverlaps(claimedFabric);
var wantedClaim = findClaimWithoutOverlaps(claims, claimedFabric);

console.log(overlaps.length); // 118223
console.log(wantedClaim.id); // 412

//-----------------------------------------------------------------------------

function fileRead(filename) {
  var contents = fs.readFileSync(filename);
  return contents.toString();
}

function chomp(text) {
  return text.replace(/(\n)+$/, '');
}

function parseClaim(string) {
  var data = string.match(/\d+/g).map(Number);

  return {
    id: data.shift(),
    coordinates: getCoordinates(...data),
  };
}

function getCoordinates(x, y, width, height) {
  var coordinates = [];

  for (let i = x + 1; i <= x + width; i += 1) {
    for (let j = y + 1; j <= y + height; j += 1) {
      coordinates.push([i, j]);
    }
  }

  return coordinates;
}

function mapCoordinates(claims) {
  var fabric = {};

  claims.forEach((claim) => {
    claim.coordinates.forEach((square) => {
      fabric[square] ? fabric[square] += 1 : fabric[square] = 1;
    });
  });

  return fabric;
}

function findOverlaps(claimedFabric) {
  return Object.keys(claimedFabric).filter((square) => claimedFabric[square] > 1);
}

function findClaimWithoutOverlaps(claims, claimedFabric) {
  return claims.find((claim) => {
    return claim.coordinates.every((square) => claimedFabric[square] == 1);
  });
}

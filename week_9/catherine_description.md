## description

- piece of fabric, at least 1000 inches on each side
- claims of areas of fabric
- claims have the following format : `#123 @ 3,2: 5x4`
  - id
  - number of inches between the left edge of the fabric and the left edge of the claim
  - number of inches between the top edge of the fabric and the top edge of the claim
  - the width of the claim
  - the height of the claim

## goals

- part 1: find the overlap between claims -> how many square inches of fabric are within two or more claims?
- part 2: find the one claim without any overlapping squares -> return the id of that claim

## high-level approach

- one fabric object, with coordinates -> I will map the claims on it
- many claim objects -> obtained by parsing the input
- in the end I need a hash of coordinates, where the coordinate is the key and the number of claims for it the value

## algorithm

- parse input into an array of claim objects
  - each claim can have an id and an array of coordinates
  - the array of coordinates can be done at this stage or at the mapping stage
- define a fabric object as a hash of coordinates (empty)
- iterate over the claim array and map them to the fabric object
- filter all coordinates with a value > 1, return the length of that array
- for part 2, iterate over the claims array to find  the one where all coordinates have a value of one in the fabric hash

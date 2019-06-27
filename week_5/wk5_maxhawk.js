function dataReverse(data) {
  var byteStream = [];
  var reverseStream = [];
  while (data.length > 0) {
    byteStream.push(data.splice(0, 8));
  }

   byteStream.reverse().forEach( (byte) => {
    reverseStream = reverseStream.concat(byte);
  });

  return reverseStream;
}
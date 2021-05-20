// comma separation function

export function indFormat(num) {
  num = num.toString();
  var lastThree = num.substring(num.length - 3);
  var otherNumbers = num.substring(0, num.length - 3);
  if (otherNumbers !== "") lastThree = "," + lastThree;
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return res;
}

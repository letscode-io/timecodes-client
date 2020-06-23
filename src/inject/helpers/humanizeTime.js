function twoDigitString(number) {
  return number.toLocaleString("nu", { minimumIntegerDigits: 2 });
}

export const humanizeTime = function (totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;

  let time = hours ? [hours, minutes, seconds] : [minutes, seconds];

  return time.map(twoDigitString).join(":");
};

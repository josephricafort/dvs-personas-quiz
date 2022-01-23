export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function getRank(rank) {
  if (rank > 3) return `${rank}th`;
  else if (rank === 1) return "TOP";
  else if (rank === 2) return `${rank}nd`;
  else if (rank === 3) return `${rank}rd`;
}

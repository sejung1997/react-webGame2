const board = Array.from({ length: 10 }, () => Array.from({ length: 9 }));
console.log(board);

const calculate = (column, row) => {};
const soldier = (part, curLoc) => [
  [curLoc + part, 0],
  [0, 1],
  [0, -1],
];
const car = [];

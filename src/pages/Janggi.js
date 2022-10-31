import { useEffect, useState } from "react";

const calculate = (column, row) => {};

const soldier = (part, curLoc) => [
  [curLoc + part, 0],
  [0, 1],
  [0, -1],
];

const car = [];
const init = () => {
  const temp = Array.from({ length: 10 }, () => Array.from({ length: 9 }));
  new Array(5).fill("쫄").forEach((el, index) => (temp[3][index * 2 + 1] = el));
};
export const PlayBoard = () => {
  const [board, setBoard] = useState([]);
  useEffect(() => {
    setBoard(temp);
  }, []);
  console.log(board, "board");
  return (
    <div
      style={{
        display: "grid",
        width: "500px",
        height: "500px",
        position: "relative",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
      }}
    >
      {board.map((el) =>
        el.map((e, i) => (
          <div style={{ border: "1px solid red" }}>
            {e}jh\
            {i}
          </div>
        ))
      )}
      <div style={{ position: "absolute", translateX: 150, translateY: 150 }}>
        ㅊ
      </div>
    </div>
  );
};

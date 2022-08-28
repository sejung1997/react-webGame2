import React, { useState } from "react";

export default function FiveStone() {
  const [playGround, setPlayGround] = useState(
    Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0))
  );
  const [isBlackTurn, setIsBlackTurn] = useState(true);
  const [over, setOver] = useState(false);
  const curValue = isBlackTurn ? 1 : -1;

  const serialCheck = ([curA, curB], [actA, actB], serialNum) => {
    console.log(serialNum);
    if (curA + actA < 0 || curB + actB < 0) return serialNum;
    if (playGround[curA + actA][curB + actB] === curValue)
      return serialCheck(
        [curA + actA, curB + actB],
        [actA, actB],
        serialNum + 1
      );
    else return serialNum;
  };
  const checkWinner = (row, column) => {
    if (
      serialCheck([row, column], [1, 0], 0) +
        serialCheck([row, column], [-1, 0], 0) >=
      4
    )
      return "end";
    if (
      serialCheck([row, column], [0, 1], 0) +
        serialCheck([row, column], [0, -1], 0) >=
      4
    )
      return "end";
    if (
      serialCheck([row, column], [1, 1], 0) +
        serialCheck([row, column], [-1, -1], 0) >=
      4
    )
      return "end";
    if (
      serialCheck([row, column], [-1, 1], 0) +
        serialCheck([row, column], [1, -1], 0) >=
      4
    )
      return "end";
    else return "continue";
  };

  const onClickGround = (row, column) => () => {
    const temp = [...playGround];
    temp[row][column] = isBlackTurn ? 1 : -1;
    if (checkWinner(row, column) === "end") setOver(true);
    else {
      setIsBlackTurn((prev) => !prev);
      setPlayGround(temp);
    }
  };
  const reset = () => {};
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>five</div>
      {over && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: "0.7",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            color: "white",
            fontSize: "30px",
            top: 0,
          }}
        >
          <div>{isBlackTurn ? "Black Win!" : "White Win!"}</div>
          <br />
          <button onClick={reset}>Restart</button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          aspectRatio: 1,
          width: "500px",
        }}
      >
        {playGround.map((row, x) => (
          <div
            key={x}
            style={{ display: "flex", width: "100%", height: "10%" }}
          >
            {row.map((column, y) => (
              <span
                key={y}
                style={{
                  width: "10%",
                  border: ".1px solid gray",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={onClickGround(x, y)}
                disabled
              >
                {column ? (column === -1 ? "○" : "●") : column}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

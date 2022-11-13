/* eslint-disable array-callback-return */
import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";


const board = Array.from({ length: 8 }, () => new Array(8).fill(""));
// new Array(5).fill("兵").forEach((el, index) => (temp[3][index * 2] = el));
// temp[0] = ["車", "馬", "象", "士", "", "士", "象", "馬", "車"];
// temp[1][4] = "漢";
// temp[2][1] = "弓";
// temp[2][7] = "弓";
// return [
//   ...temp,
//   new Array(9).fill(""),
//   new Array(9).fill(""),
//   ...temp.reverse(),
// ];
// return temp;
const outCheck = (position) => {
  if (position < 0 || position > 89) return true;
};

export const PlayBoard = () => {
  // const [board, setBoard] = useState(new Array(9).fill(new Array(9).fill("")));
  const [pieces, setPieces] = useState({
    0: ["red", "車"],
    1: ["red", "馬"],
    2: ["red", "象"],
    3: ["red", "士"],
    5: ["red", "士"],
    6: ["red", "象"],
    7: ["red", "馬"],
    8: ["red", "車"],
    13: ["red", "漢"],
    19: ["red", "弓"],
    25: ["red", "弓"],
    27: ["red", "兵"],
    29: ["red", "兵"],
    31: ["red", "兵"],
    33: ["red", "兵"],
    35: ["red", "兵"],
    45: ["green", "卒"],
    47: ["green", "卒"],
    49: ["green", "卒"],
    51: ["green", "卒"],
    53: ["green", "卒"],
    55: ["green", "弓"],
    61: ["green", "弓"],
    67: ["green", "椒"],
    72: ["green", "車"],
    73: ["green", "馬"],
    74: ["green", "象"],
    75: ["green", "士"],
    77: ["green", "士"],
    78: ["green", "象"],
    79: ["green", "馬"],
    80: ["green", "車"],
  });
  const emptyCheck = (direction, position, ...vacancy) => {
    const nextPosition = position + direction * ([...vacancy].length + 1);
    if (
      outCheck(nextPosition) ||
      Math.floor(position / 9) !== Math.floor(nextPosition / 9)
    )
      return [...vacancy];
    // else if (!playGround[position + direction])
    return emptyCheck(direction, position, ...vacancy, nextPosition);
    // else if (playGround[position + direction]) return [...vacancy, nextPosition];
  };
  const move = (type, position) => {
    console.log(type, "onclick");
    switch (type) {
      case "車":
        return [-1, 1, -9, 9].map((el) => emptyCheck(el, position));
      case "弓":
        return [-1, 1, -9, 9].map((el) => {
          const nextStep = emptyCheck(el, position).at(-1);
          if (nextStep !== undefined) return emptyCheck(el, nextStep);
        });
      case "馬":
        return [-11, -19, -17, -7, 7, 17, 19, 11].map((el) => {
          if (!outCheck(position + el)) return position + el;
        });
      case "象":
        return [-21, -29, -25, -15, 15, 25, 29, 21].map((el) => {
          if (!outCheck(position + el)) return position + el;
        });
      case "兵":
        return [-1, 1, 9].map((el) => {
          if (!outCheck(position + el)) return position + el;
        });
      case "卒":
        return [-1, 1, -9].map((el) => {
          if (!outCheck(position + el)) return position + el;
        });
      case "漢":
        return [3, 4, 5, 12, 13, 14, 21, 22, 23].map((el) => {
          if (
            Math.abs((el % 9) - (position % 9)) < 2 &&
            Math.abs(el - position) <= 10
          )
            return el;
        });
      case "椒":
        return [66, 67, 68, 75, 76, 77, 84, 85, 86].map((el) => {
          if (
            Math.abs((el % 9) - (position % 9)) < 2 &&
            Math.abs(el - position) <= 10
          )
            return el;
        });
      default:
        return;
    }
  };

  const onClickObject = (name, position) => {
    // console.log(name, position, "onClickObject");
    move(name[1], Number(position)).map((po) =>
      setPieces({ ...pieces, [po]: [name[0], ""] })
    );
  };
  console.log(board, "board");

  return (
    <Container>
      <div
        style={{
          padding: "30px",
          border: "1px solid gray",
          display: "grid",
          position: "relative",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr  1fr",
        }}
      >
        {board.map((el, index) =>
          el.map((e, i) => (
            <div
              key={e}
              style={{
                border: "1px solid gray",
                width: "50px",
                height: "50px",
                boxSizing: "border-box",
              }}
            ></div>
          ))
        )}
        {Object.entries(pieces).map((el, index) => {
          const left = `${12.5 + 50 * (el[0] % 9)}px`;
          const top = `${12.5 + 50 * Math.floor(el[0] / 9)}px`;
          console.log(left, top);
          return (
            <div
              key={el}
              onClick={() => {
                onClickObject(el[1], el[0]);
              }}
              // ref={(el) => (moveEl.current[index] = el)}
              style={{
                position: "absolute",
                left: left,
                top: top,
                border: `1px solid ${el[1][0]}`,
                transition: "2s",
                borderRadius: 50,
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5,
                boxSizing: "border-box",
                backgroundColor: "#Ffff",
                color: el[1][0],
                cursor: "pointer",
              }}
            >
              {el[1][1]}
            </div>
          );
        })}
      </div>
      {/* <button onClick={onClickMove}>move</button> */}
    </Container>
  );
};

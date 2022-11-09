import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
const calculate = (column, row) => {};

const soldier = (part, curLoc) => [
  [curLoc + part, 0],
  [0, 1],
  [0, -1],
];
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const car = [];

const board = Array.from({ length: 8 }, () => new Array(9).fill(""));
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
const emptyCheck = (direction, position, ...vacancy) => {
  const nextPosition = position + direction;
  if (
    nextPosition < 0 ||
    nextPosition > 91 ||
    Math.floor(position / 9) !== Math.floor(nextPosition / 9)
  )
    return vacancy;
  if (!playGround[position + direction])
    emptyCheck(direction * 2, position, ...vacancy, nextPosition);
};
const jumpMove = (position, playGround, type) => {
  [-1, 1, -9, 9].map((el) => emptyCheck(el, position));
};
const move = {
  車: {},
};
export const PlayBoard = () => {
  // const [board, setBoard] = useState(init());
  const [possibleMove, setPossibleMove] = useState([]);
  const [han, setHan] = useState([
    { 車: [0, 0] },
    { 馬: [1, 0] },
    { 象: [2, 0] },
    { 士: [3, 0] },
    { 士: [5, 0] },
    { 象: [6, 0] },
    { 馬: [7, 0] },
    { 車: [8, 0] },
    { 漢: [4, 1] },
    { 弓: [1, 2] },
    { 弓: [7, 2] },
    { 兵: [0, 3] },
    { 兵: [2, 3] },
    { 兵: [4, 3] },
    { 兵: [6, 3] },
    { 兵: [8, 3] },
  ]);
  const [cho, setCho] = useState([
    { 車: [0, 9] },
    { 馬: [1, 9] },
    { 象: [2, 9] },
    { 士: [3, 9] },
    { 士: [5, 9] },
    { 象: [6, 9] },
    { 馬: [7, 9] },
    { 車: [8, 9] },
    { 漢: [4, 8] },
    { 弓: [1, 7] },
    { 弓: [7, 7] },
    { 卒: [0, 6] },
    { 卒: [2, 6] },
    { 卒: [4, 6] },
    { 卒: [6, 6] },
    { 卒: [8, 6] },
  ]);
  const moveEl = useRef([]);

  useEffect(() => {
    console.log(moveEl);
  }, [moveEl]);

  const onClickObject = (index, target) => {
    switch (target) {
      case "車":
    }
    console.log(moveEl);
  };
  console.log(board, "board");
  const onClickMove = () => {
    setHan([
      { 車: [1, 1] },
      { 馬: [2, 1] },
      { 象: [3, 1] },
      { 士: [4, 1] },
      { 士: [6, 1] },
      { 象: [7, 1] },
      { 馬: [8, 1] },
      { 車: [9, 1] },
      { 漢: [5, 2] },
      { 弓: [2, 3] },
      { 弓: [8, 3] },
      { 兵: [1, 4] },
      { 兵: [3, 4] },
      { 兵: [5, 4] },
      { 兵: [7, 4] },
      { 兵: [9, 4] },
    ]);
  };
  return (
    <Container>
      <div
        style={{
          padding: "30px",
          border: "1px solid gray",
          display: "grid",
          position: "relative",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {board.map((el, index) =>
          el.map((e, i) => (
            <div
              style={{
                border: "1px solid gray",
                width: "50px",
                height: "50px",
                boxSizing: "border-box",
              }}
            ></div>
          ))
        )}
        {han.map((el, index) => {
          console.log(el[Object.keys(el)][0], el[Object.keys(el)][1]);
          return (
            <div
              onClick={onClickObject(index)}
              ref={(el) => (moveEl.current[index] = el)}
              style={{
                position: "absolute",
                left: `${50 * el[Object.keys(el)][0] + 15}px`,
                top: `${50 * el[Object.keys(el)][1] + 15}px`,
                border: "1px solid brown",
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
              }}
            >
              {Object.keys(el)}
            </div>
          );
        })}
        {cho.map((el, index) => {
          console.log(el[Object.keys(el)][0], el[Object.keys(el)][1]);
          return (
            <div
              onClick={onClickObject(index)}
              ref={(el) => (moveEl.current[index] = el)}
              style={{
                position: "absolute",
                left: `${50 * el[Object.keys(el)][0] + 15}px`,
                top: `${50 * el[Object.keys(el)][1] + 15}px`,
                border: "1px solid green",
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
              }}
            >
              {Object.keys(el)}
            </div>
          );
        })}
      </div>
      {/* <button onClick={onClickMove}>move</button> */}
    </Container>
  );
};

import React, { useState } from "react";
const rsp = ["👊", "🤚", "✌"];
const Rsp = () => {
  const [pick, setPick] = useState(["", ""]);
  const [result, setResult] = useState([]);
  const [money, setMoney] = useState([]);
  const [round, setRound] = useState(10);
  const inputEl = React.useRef(null);

  const changeMoney = (winnerIndex) => {
    if (!winnerIndex) return;
    let curMoney = [...money];
    const bet = Number(inputEl.current.value);
    if (winnerIndex > 0) {
      curMoney[0] = curMoney[0] - bet;
      curMoney[1] = curMoney[1] + bet;
    } else {
      curMoney[0] = curMoney[0] + bet;
      curMoney[1] = curMoney[1] - bet;
    }
    console.log(curMoney);
    return curMoney;
  };
  const checkWinner = (ai, you) => {
    const temp = [...result] || [];
    let current = [ai, you];
    const num = ai - you;
    if (num === 0) current[2] = 0;
    else if (num === -1 || num === 2) current[2] = 1;
    else current[2] = -1;
    const curMoney = changeMoney(current[2]);
    temp.unshift(current);
    inputEl.current.value = "";
    setResult(temp);
    if (!curMoney) return setRound((prev) => prev - 1);
    setMoney(curMoney);
    const winner = curMoney?.findIndex((el) => el <= 0);
    if (winner === -1) {
      setRound((prev) => prev - 1);
    } else setRound([winner]);
  };
  const computerPick = (i) => () => {
    if (inputEl.current.value === "") return alert("금액을 입력해주세요");
    let temp = Math.floor(Math.random() * 100) % 3;
    console.log(temp);
    setPick([rsp[temp], rsp[i]]);
    checkWinner(temp, i);
    console.log(inputEl, "inputEl");
  };
  const startGame = (e) => {
    console.log("e", e);

    if (!e.target[0].value) return;
    setMoney([Number(e.target[0].value), Number(e.target[0].value)]);
    setRound((prev) => prev - 1);
  };
  const reset = () => {
    setRound(10);
    setResult([]);
    setPick(["", ""]);
  };
  return (
    <>
      {round === 10 ? (
        <form onSubmit={startGame}>
          <div>Select game money </div>
          <input type="number" />
          <button>시작</button>
        </form>
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {round[0] === 0 || round[0] === 1 || round === 0 ? (
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
              <div>{round[0] ? "You lose" : "You win"}</div>
              <br />
              <button onClick={reset}>Restart</button>
            </div>
          ) : null}

          <div>
            <h1>AI</h1>
            <h4>Banlance : {money?.[0]}</h4>
            {result.length > 0 && (
              <div>
                <h4>
                  {(
                    (result.filter((el) => el[2] === -1).length * 100) /
                    result.filter((el) => el[2]).length
                  ).toFixed(0)}
                  %
                </h4>
                <div>history</div>
                {rsp.map((el, index) => (
                  <div>
                    {rsp[index]}
                    {(
                      (result.filter((el) => el[0] === index).length * 100) /
                      result.length
                    ).toFixed(0)}
                    %
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>Round: {10 - round}</div>
            <div style={{ fontSize: "30px", marginTop: "40px" }}>
              {pick[0]} vs {pick[1]}
            </div>
            {result.length > 0 && (
              <div style={{ fontSize: "25px", color: "red" }}>
                {result[0][2]
                  ? result[0][2] === 1
                    ? "You win!"
                    : "You lose!"
                  : "Draw!"}
              </div>
            )}
            <div>
              <h5>Bet your money!</h5>
              <input ref={inputEl} />
            </div>
            <div style={{ marginTop: "40px" }}>
              {rsp.map((el, index) => (
                <button
                  style={{
                    marginTop: "40px",
                    width: "100px",
                    fontSize: "30px",
                  }}
                  onClick={computerPick(index)}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h1>You</h1>
            <h4>Banlance : {money?.[1]}</h4>
            {result.length > 0 && (
              <div>
                <h4>
                  {(
                    (result.filter((el) => el[2] === 1).length * 100) /
                    result.filter((el) => el[2]).length
                  ).toFixed(0)}
                  %
                </h4>
                <div>Money: {}</div>
                {rsp.map((el, index) => (
                  <div>
                    {rsp[index]}
                    {(
                      (result.filter((el) => el[1] === index).length * 100) /
                      result.length
                    ).toFixed(0)}
                    %
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Rsp;

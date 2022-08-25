import { useEffect, useState, useCallback, useRef } from "react";
const startArray = [3, 2, 1, "Start!", null];

const Home = () => {
  const [numbers, setNumbers] = useState([]);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(0);
  const [value, setValue] = useState("");
  const [record, setRecord] = useState(0);
  const [onGame, setOnGame] = useState(false);
  const inputEl = useRef(null);

  const setGame = () => {
    const temp = [1, 1].map((el) => Math.floor(Math.random() * 10));
    setNumbers(temp);
  };
  const startTimer = useCallback(() => {
    console.log("실행", time);
    setTimeout(() => {
      setTime((prev) => prev - 100);
    }, 100);
  }, []);

  const gameStart = useCallback(() => {
    console.log(" 실행0", start);
    setTimeout(() => {
      setStart((prev) => prev + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (start === 4) {
      setTime(5000);
      inputEl.current.focus();
      setOnGame(true);
      setGame();
    } else gameStart();
    console.log(start, "start");
    return () => clearInterval();
  }, [start]);

  useEffect(() => {
    if (!onGame) return;
    if (start !== 4) return;
    if (time === 0) return setOnGame(false);
    else startTimer();
    return () => clearInterval();
  }, [time]);

  const submit = () => {
    console.log("submit");
    if (numbers[0] * numbers[1] === Number(value)) {
      setValue("");
      setRecord((prev) => prev + 1);
      setGame();
      setTime(5000);
      inputEl.current.focus();
    } else {
      setOnGame(false);
      setValue(
        (prev) =>
          prev + "가 아니라 " + String(numbers[0] * numbers[1]) + "입니다."
      );
    }
  };
  const reset = () => {
    // startTimer();
    setRecord(0);
    setStart(0);
    setValue("");
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") submit();
  };
  return (
    <>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          position: "relative",
          border: "1px solid red",
        }}
      >
        {!onGame &&
          (startArray[start] === null ? (
            <>
              <div
                style={{
                  display: "flex",
                  top: "15%",
                  flexDirection: "column",
                  position: "absolute",
                  alignItems: "center",
                  zIndex: 15,
                  width: "350px",
                  backgroundColor: "#fff",
                }}
              >
                <h1>Game Over</h1>

                <h5>Your Record is {record}</h5>
                <h5>{value}</h5>
                <h5>{time}</h5>
                <button onClick={reset}>RESTART</button>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: onGame ? "" : "black",
                  opacity: onGame ? "" : "0.7",
                  position: "absolute",
                  zIndex: 2,
                  top: 0,
                }}
              />
            </>
          ) : null)}

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          {startArray[start] === null ? (
            <>
              <h1>{`${numbers[0]} x ${numbers[1]}`}</h1>{" "}
              <div style={{ color: "red" }}>남은시간 {time}</div>
              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-around ",
                }}
              >
                <input
                  ref={inputEl}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  style={{ zIndex: 1 }}
                  onKeyPress={onKeyPress}
                ></input>

                <button onClick={submit}>Enter</button>
              </div>
              <div>총 맞춘 개수: {record} 개</div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                top: "10%",
                flexDirection: "column",
                position: "absolute",
                alignItems: "center",
                zIndex: 15,
                backgroundColor: "#fff",
                width: "350px",
                fontSize: "30px",
              }}
            >
              <h1>{startArray[start]}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

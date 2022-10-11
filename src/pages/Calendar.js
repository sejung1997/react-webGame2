import { useState, useMemo, useEffect, useCallback } from "react";
import moment from "moment";
import { data } from "../data/calendarData";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

// 월별 총 합
const sumOfYear = () => {
  let initDay = data[0].date1.slice(0, 7);
  let temp = {};
  data.reduce((p, c) => {
    if (initDay !== c.date1.slice(0, 7)) {
      if (!temp[initDay.slice(0, 4)]) temp[initDay.slice(0, 4)] = new Array(12);
      temp[initDay.slice(0, 4)][Number(initDay.slice(5, 7) - 1)] = p;
      initDay = c.date1.slice(0, 7);
      return 0;
    } else return p + c.cnt;
  }, 0);
  return temp;
};

export default function Calendar() {
  const date = new Date();

  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [calendarData, setCalendarData] = useState([]);

  const AllDataOfYear = useMemo(() => {
    const sum = sumOfYear();
    return sum[`${year}`];
  }, [year]);

  const makingCalendar = () => {
    // while문 초기세팅
    let startDay = new Date(year, month - 1, 1).getDay();
    const endDate = new Date(year, month, 0).getDate();

    const initialDataIndex = data.findIndex(
      (el) => el.date1 === `${year}-${String(month).padStart(2, "0")}-01`
    );
    const emptyDays = new Array(startDay).fill(null);
    const calendar = [emptyDays];
    let weekSum = 0;
    console.log(startDay, emptyDays, calendar, endDate);

    for (let i = 1; i <= endDate; i++) {
      const cnt =
        initialDataIndex - (i - 1) >= 0
          ? data[initialDataIndex - (i - 1)].cnt
          : 0;
      calendar.at(-1).push({
        date: i,
        cnt,
      });
      weekSum += cnt;
      if (calendar.at(-1).length === 7) {
        calendar.at(-1)[7] = {
          date: null,
          cnt: weekSum,
        };
        weekSum = 0;
        calendar.push([]);
      }
    }
    while (calendar.at(-1).length !== 8) {
      if (calendar.at(-1).length === 7) {
        calendar.at(-1).push({
          date: null,
          cnt: weekSum,
        });
      } else calendar.at(-1).push(null);
    }

    console.log(calendar, "dayArr");
    setCalendarData(calendar);
  };

  useEffect(() => {
    makingCalendar();
  }, [month, year]);

  const changeCurMonth = useCallback(
    (i) => () => {
      const temp = month + i;
      if (temp <= 0) {
        setMonth(12);
        setYear((prev) => prev - 1);
      } else if (temp > 12) {
        setMonth(1);
        setYear((prev) => prev + 1);
      } else setMonth(temp);
    },
    [month]
  );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            width: "500",
            justifyContent: "space-around",
          }}
        >
          <button
            style={{ height: "50px" }}
            onClick={() => setYear((prev) => prev - 1)}
          >
            이전
          </button>
          <div style={{ width: "50px" }}>{year}년</div>

          <button
            style={{ height: "50px" }}
            onClick={() => setYear((prev) => prev + 1)}
          >
            다음
          </button>
        </div>
        <div
          style={{
            display: "flex",
            width: "500",
            justifyContent: "space-around",
          }}
        >
          <button style={{ height: "50px" }} onClick={changeCurMonth(-1)}>
            이전
          </button>
          <div style={{ width: "50px" }}>{month}월</div>

          <button style={{ height: "50px" }} onClick={changeCurMonth(1)}>
            다음
          </button>
        </div>

        <table border="1" cellspacing="0" width="500">
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
            <th>합계</th>
          </tr>
          {calendarData?.map((el, index) => (
            <tr>
              {el?.map((el2, index2) => (
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  {el2 !== null && (
                    <div>
                      <div>{el2.date ? `${month}/${el2.date}` : ""}</div>
                      <div>{el2.cnt}</div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
      {AllDataOfYear && (
        <table border="1" cellspacing="0" width="180">
          <tr>
            <th></th>
            <th>주 평균</th>
            <th>총 합</th>
          </tr>
          {new Array(12).fill(1).map((el, index) => (
            <tr
              style={{
                textAlign: "center",
              }}
            >
              <td>{index + 1}월</td>
              <td>{AllDataOfYear[index] / 4 || ""}</td>
              <td>{AllDataOfYear[index] || ""}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

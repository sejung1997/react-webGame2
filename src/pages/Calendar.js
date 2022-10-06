import { useState, useMemo, useEffect } from "react";
import moment from "moment";
import { data } from "../data/calendarData";
// sate 초기화
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 윤년 계산

export default function Calendar() {
  const date = new Date();

  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [calendarData, setCalendarData] = useState([
    [null, null, null, null, null, null, null],
  ]);
  console.log(data[0].date1.split("-"));

  const sumOfYear = useMemo(() => {
    let initDay = data[0].date1.slice(0, 7);
    console.log(initDay);
    let temp = {
      [data[0].date1.split("-")[0]]: {
        [data[0].date1.split("-")[1]]: 0,
      },
    };
    data.reduce((p, c) => {
      if (initDay !== c.date1.slice(0, 7)) {
        temp[c.date1.split("-")[0]][c.date1.split("-")[1]] = c.cnt;
        initDay = c.date1.slice(0, 7);
        return c.cnt;
      } else {
        temp[c.date1.split("-")[0]] = {};
        temp[c.date1.split("-")[0]][c.date1.split("-")[1]] = p + c.cnt;
        return p + c.cnt;
      }
    }, 0);
    return temp;
  }, []);
  console.log(sumOfYear);
  const makingCalendar = () => {
    // 윤년 세팅
    if (month === 2) {
      console.log("2222");
      if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0))
        monthDays[1] = 29;
      else monthDays[1] = 28;
    }

    // while문 초기세팅
    let calendarMonthStartDay = new Date(year, month - 1, 1).getDay();
    // console.log(typeof calendarMonthStartDay);
    // console.log(
    //   new Date(year, month - 1, 1),
    //   year,
    //   month,
    //   calendarMonthStartDay,
    //   "calendarMonthStartDa"
    // );
    const initialDataIndex = data.findIndex(
      (el) => el.date1 === `${year}-${String(month).padStart(2, "0")}-01`
    );
    let number = 1;
    const temp = [[null, null, null, null, null, null, null]];
    let weekIndex = 0;
    let weekSum = 0;

    while (number <= monthDays[month - 1]) {
      const dayIndex = calendarMonthStartDay % 8;
      if (!temp[weekIndex]) {
        temp[weekIndex] = [null, null, null, null, null, null, null];
      }

      if (dayIndex === 7) {
        temp[weekIndex][7] = {
          date: null,
          cnt: weekSum,
        };
        calendarMonthStartDay = 0;
        weekIndex++;
        weekSum = 0;
      } else {
        const cnt =
          initialDataIndex - (number - 1) >= 0
            ? data[initialDataIndex - (number - 1)].cnt
            : 0;
        temp[weekIndex][dayIndex] = {
          date: number,
          cnt,
        };
        calendarMonthStartDay++;
        weekSum += cnt;
        number++;
        if (number === monthDays[month - 1])
          temp[weekIndex][7] = {
            date: null,
            cnt: weekSum,
          };
      }
    }
    console.log(temp, "dayArr");
    setCalendarData(temp);
  };

  useEffect(() => {
    makingCalendar();
  }, [month, year]);

  const changeCurMonth = (i) => () => {
    const temp = month + i;

    if (temp < 0) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else if (temp > 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else setMonth(temp);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
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
      <div style={{ display: "flex" }}>
        <button style={{ height: "50px" }} onClick={changeCurMonth(-1)}>
          이전
        </button>
        <div style={{ width: "50px" }}>{month}월</div>

        <button style={{ height: "50px" }} onClick={changeCurMonth(1)}>
          다음
        </button>
      </div>

      <table>
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
                  width: "50px",
                  border: "1px solid gray",
                }}
              >
                {el2 !== null && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ textAlign: "center" }}>
                      {el2.date ? `${month}/${el2.date}` : ""}
                    </div>
                    <div style={{ textAlign: "center" }}>{el2.cnt}</div>
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
}

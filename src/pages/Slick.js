/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

const item = [
  {
    key: 0,
    source: {
      default: "/images/home/main_slide/main_slide_1.png",
      mobile: "/images/home/main_slide/main_slide_1_m.jpg",
    },
    title: "담보대출을 디자인하다",
    href: "/diagnosis",
    isRequireLogin: true,
  },
  {
    key: 1,
    source: {
      default: "/images/home/main_slide/main_slide_2.png",
      mobile: "/images/home/main_slide/main_slide_2_m.jpg",
    },
    title: "당신만의 은행을 가지세요",
    href: "/loans",
    isRequireLogin: true,
  },
  {
    key: 2,
    source: {
      default: "/images/home/main_slide/main_slide_3.png",
      mobile: "/images/home/main_slide/main_slide_3_m.jpg",
    },
    title: "담보대출에 감동하다",
    href: "/review/recent",
  },
  {
    key: 3,
    source: {
      default: "/images/home/main_slide/main_slide_4.png",
      mobile: "/images/home/main_slide/main_slide_4_m.jpg",
    },
    title: "온라인 담보대출을 혁신하다",
    href: "/plus/all",
  },
  {
    key: 4,
    source: {
      default: "/images/home/main_slide/main_slide_5.png",
      mobile: "/images/home/main_slide/main_slide_5_m.jpg",
    },
    title: "뱅크몰에 빠지다",
    href: "/mybankmall/diagnosis",
    isRequireLogin: true,
  },
  {
    key: 5,
    source: {
      default: "/images/home/main_slide/main_slide_1.png",
      mobile: "/images/home/main_slide/main_slide_1_m.jpg",
    },
    title: "담보대출을 디자인하다",
    href: "/diagnosis",
    isRequireLogin: true,
  },
  {
    key: 6,
    source: {
      default: "/images/home/main_slide/main_slide_2.png",
      mobile: "/images/home/main_slide/main_slide_2_m.jpg",
    },
    title: "당신만의 은행을 가지세요",
    href: "/loans",
    isRequireLogin: true,
  },
  {
    key: 7,
    source: {
      default: "/images/home/main_slide/main_slide_3.png",
      mobile: "/images/home/main_slide/main_slide_3_m.jpg",
    },
    title: "담보대출에 감동하다",
    href: "/review/recent",
  },
];
// 슬라이드 넓이 + 여백 설정
const slideWidth = 200;
// slideWidth를 몇 초 동안 이동할지 설정
const duration = 2;
export default function Test() {
  const [items, setItems] = useState(item);
  const [move, setMove] = useState(0);
  const motionRef = useRef(null);
  const moveTimer = useRef(null);
  const RestPopIndex = useRef(0);
  const popIndex = useRef(0);

  const controls = useAnimationControls();

  const onclick = useCallback(() => {
    console.log(popIndex.current, "move");
    const temp = [...items];
    temp.push(temp[popIndex.current]);
    temp[popIndex.current] = null;
    setItems(temp);
  }, [popIndex.current, items]);

  // const variants = React.useMemo(
  //   () => ({
  //     hide: () => {
  //       console.log(move, "move1");

  //       if (move === 0) return;
  //       else return { left: `${move}px` };
  //     },
  //     reveal: () => {
  //       // if (motionRef.current)
  //       // console.log(motionRef.current.offsetLeft, "move2");
  //       console.log(move, hover, "move2");
  //       if (move === 0) return;
  //       if (hover) return { left: `${move}px` };
  //       else return { left: `${move - 100}px` };
  //     },
  //     hover: () => {
  //       console.log(controls, "controls");
  //       controls.stop();
  //       // if (hover) return;
  //       // setHover(true);
  //       // return { left: `-${move - 500}px` };
  //     },
  //   }),

  //   [move]
  // );

  const changeMove = () => {
    console.log(move, "setmove");
    setMove((prev) => prev - slideWidth);
    popIndex.current += 1;
  };
  useEffect(() => {
    moveTimer.current = setInterval(changeMove, duration * 1000);
    console.log(moveTimer.current, "moveInterval");
    return () => clearInterval(moveTimer.current);
  }, []);
  // useEffect(() => {
  //   if (!hover) return;
  //   console.log(moveInterval, "moveInterval");

  //   return clearInterval(moveInterval);
  // }, [hover]);
  // useEffect(() => {
  //   setInterval(() => {
  //     if (!hover) setTime((prev) => prev + 1);
  //   }, 2000);
  //   return () =>
  //     setInterval(() => {
  //       setTime((prev) => prev + 1);
  //     }, 2000);
  // }, []);
  useEffect(() => {
    onclick();
    console.log(popIndex.current, "popIndex");
  }, [popIndex.current]);
  useEffect(() => {
    controls.set({ left: `${move}px` });
    controls.start({ left: `${move - slideWidth}px` });
  }, [move]);

  return (
    <AnimatePresence>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            position: "relative",
            border: "1px solid red",
            width: "1720px",
          }}
        >
          <motion.div
            ref={motionRef}
            style={{ display: "flex", position: "absolute" }}
            // variants={variants}
            // initial="hide"
            // animate="reveal"
            // whileHover="hover"`
            animate={controls}
            onHoverStart={() => {
              controls.stop();
              clearInterval(moveTimer.current);

              console.log(move, "onMouseEnter");
            }}
            onHoverEnd={() => {
              console.log(motionRef.current.offsetLeft, move, "mouse");
              RestPopIndex.current +=
                (move - motionRef.current.offsetLeft) / slideWidth;
              if (RestPopIndex.current >= 1) {
                popIndex.current++;
                RestPopIndex.current--;
              }
              setMove(motionRef.current.offsetLeft);
              moveTimer.current = setInterval(changeMove, duration * 1000);
            }}
            transition={{
              delay: 0,
              duration: duration,
              // repeat: Infinity,
              // repeatDelay: 0,
              ease: "linear",
            }}
          >
            {items?.map((item, index) => {
              if (item === null)
                return <div style={{ width: slideWidth }}></div>;
              return (
                <div style={{ border: "1px solid red", width: slideWidth }}>
                  <img src={item.source.default} alt={item.title} />
                  <div>
                    <h1>{item.title}</h1>
                    <h2>h2h2h2h2h2h2h2</h2>
                    <h3>h3h3h3h3h3h3h3</h3>
                  </div>
                  <div className="additional">additional text</div>
                </div>
              );
            })}
          </motion.div>
          {/* <motion.div
            // ref={motionRef}
            style={{ display: 'flex', position: 'absolute' }}
            variants={variants}
            initial="hide"
            animate="reveal"
            // onHoverStart={() => }
            transition={{ delay: 10, duration: 10, property: 'left', repeat: 1, repeatType: 'loop' }}
          >
            {items?.map((item, index) => {
              if (item === null) return <div style={{ width: '200px' }}></div>;
              return (
                <div style={{ border: '1px solid red', width: '200px' }}>
                  <img src={item.source.default} alt={item.title} />
                  <div>
                    <h1>{item.title}</h1>
                    <h2>h2h2h2h2h2h2h2</h2>
                    <h3>h3h3h3h3h3h3h3</h3>
                  </div>
                  <div className="additional">additional text</div>
                </div>
              );
            })}
          </motion.div> */}
        </div>
      </div>
      <button
        style={{ display: "flex", position: "absolute" }}
        onClick={onclick}
      >
        click
      </button>
    </AnimatePresence>
  );
}

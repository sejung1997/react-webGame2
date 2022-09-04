/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useRef } from "react";
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
export default function Test() {
  const [items, setItems] = useState(item);
  const [move, setMove] = useState(0);
  // const [time, setTime] = useState(0);
  const [hover, setHover] = useState(false);
  const motionRef = useRef(null);
  const moveTimerRef = useRef(null);
  const onclick = () => {
    const time = -move / 100 / 2;
    console.log(time, "move");
    const temp = [...items];
    temp.push(temp[time]);
    temp[time] = null;
    setItems(temp);
  };
  const controls = useAnimationControls();
  console.log(controls, "controls");

  const variants = React.useMemo(
    () => ({
      hide: () => {
        console.log(move, "move1");

        if (move === 0) return;
        else return { left: `${move}px` };
      },
      reveal: () => {
        // if (motionRef.current)
        // console.log(motionRef.current.offsetLeft, "move2");
        console.log(move, hover, "move2");
        if (move === 0) return;
        if (hover) return { left: `${move}px` };
        else return { left: `${move - 100}px` };
      },
      hover: () => {
        console.log(controls, "controls");
        controls.stop();
        // if (hover) return;
        // setHover(true);
        // return { left: `-${move - 500}px` };
      },
    }),

    [move]
  );

  useEffect(() => {
    // setInterval(() => {
    //   console.log('setInterval');
    //   const temp = [...items];
    //   temp.push(temp.shift());
    //   setItems(temp);
    // }, 1000);
    // return () =>
    //   setInterval(() => {
    //     const first = items.shift();
    //     items.push(first);
    //   }, 1000);
    // if (motionRef && motionRef.current) {
    //   motionRef.current.addEventListener('');
    // }
  }, []);
  const changeMove = () => {
    console.log(move, "setmove");
    setMove((prev) => prev - 100);
  };
  useEffect(() => {
    moveTimerRef.current = setInterval(changeMove, 1000);
    console.log(moveTimerRef.current, "moveInterval");
    return () => clearInterval(moveTimerRef.current);
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
    console.log(motionRef, "motionRef");
    if ((move / 100) % 2) return;
    onclick();
  }, [move]);
  useEffect(() => {
    controls.set({ left: `${move}px` });
    controls.start({ left: `${move - 100}px` });
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
            variants={variants}
            // initial="hide"
            // animate="reveal"
            whileHover="hover"
            animate={controls}
            onMouseEnter={() => {
              controls.stop();
              clearInterval(moveTimerRef.current);

              console.log("onMouseEnter");
            }}
            onMouseLeave={() => {
              controls.start({ left: `${move - 100}px` });
              moveTimerRef.current = setInterval(changeMove, 1000);
            }}
            transition={{
              delay: 0,
              duration: 1,
              // repeat: Infinity,
              // repeatDelay: 0,
              ease: "linear",
            }}
          >
            {items?.map((item, index) => {
              if (item === null) return <div style={{ width: "200px" }}></div>;
              return (
                <div style={{ border: "1px solid red", width: "200px" }}>
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

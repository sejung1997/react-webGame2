// // import { motion } from "framer-motion-3d";
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { Canvas } from "@react-three/fiber";
// import Scene from "../components/Three/Scene";
// import styled from "styled-components";
// import { motion, useAnimationControls } from "framer-motion";

// const textMotion = {
//   rest: {
//     color: "grey",
//     x: 0,
//     transition: {
//       duration: 2,
//       type: "tween",
//       ease: "easeIn",
//     },
//   },
//   hover: {
//     color: "blue",
//     x: 30,
//     transition: {
//       duration: 0.4,
//       type: "tween",
//       ease: "easeOut",
//     },
//   },
// };

// const slashMotion = {
//   rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
//   hover: {
//     opacity: 1,
//     transition: {
//       duration: 0.4,
//       type: "tween",
//       ease: "easeIn",
//     },
//   },
// };

// const HoverTest = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const controls = useAnimationControls();
//   const [currentLocation, setCurrentLocation] = useState([100, 100]);
//   const [pastLocation, setPastLocation] = useState([0, 0]);
//   function startDrag(event) {
//     controls.start(event, { snapToCursor: true });

//     controls.start(event);
//   }
//   const up = () => {
//     const temp = [...currentLocation];
//     console.log(temp, "up");

//     setPastLocation(temp);
//     temp[1] += 100;
//     console.log(temp, "up");

//     setCurrentLocation(temp);
//   };

//   const keyDown = (e) => {
//     switch (e.code) {
//       case "ArrowUp":
//         console.log(currentLocation, "up1");
//         up();
//         break;
//       case "ArrowLeft":
//         console.log("ArrowLeft", "keydown");
//         break;
//       case "ArrowRight":
//         console.log("ArrowRight", "keydown");
//         break;
//       case "ArrowDown":
//         console.log("ArrowDown", "keydown");
//         break;
//       default:
//         console.log("default", "keydown");
//         return;
//     }
//   };
//   useEffect(() => {
//     window.addEventListener("keydown", keyDown);
//     return () => window.removeEventListener("keydown", keyDown);
//   }, []);

//   useEffect(() => {
//     console.log(currentLocation, "currentLocation");
//     controls.set({
//       left: `${pastLocation[0]}px`,
//       top: `${pastLocation[1]}px`,
//     });
//     controls.start({
//       left: `${currentLocation[0]}px`,
//       top: `${currentLocation[1]}px`,
//     });
//   }, [currentLocation]);
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//       }}
//     >
//       {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => el)}
//       <motion.div
//         style={{ display: "flex", position: "absolute" }}
//         animate={controls}
//         transition={{
//           delay: 0,
//           duration: 1,
//           // repeat: Infinity,
//           // repeatDelay: 0,
//           ease: "linear",
//         }}
//       >
//         V
//       </motion.div>
//     </div>
//   );
// };
// export default HoverTest;
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
// import Link from "next/link";

import styled from "styled-components";

const Container = styled.div`
  /* width: 1600px; */
  width: 100%;
  height: 480px;
  position: relative;
  color: #fff;
  overflow: hidden;
`;
const SliderWrapper = styled.div`
  width: 360px !important;
  height: 480px;
  padding: 25px 20px 15px;
  display: flex !important;
  margin-right: 60px;
  flex-direction: column !important;
  background-color: #fff;
  border-radius: 20px;
  :hover {
    cursor: pointer;
  }
  img {
    width: 320px;
    height: 200px;
  }
  .additional {
    color: #d1d1d1;
    font-size: 12px;
  }
`;
const TextGroup = styled.div`
  flex-grow: 1;
  z-index: 24;
  h1 {
    margin-top: 41px;

    color: #333;
    font-weight: bold;
    font-size: 30px;
    height: 44px;
  }
  h2 {
    color: #333;
    font-size: 20px;
    height: 44px;
  }
  h3 {
    color: #707070;
    font-size: 14px;
    height: 44px;
  }
`;
const item = [
  {
    key: 0,
    source: {
      default: "/images/home/main_slide/main_slide_1.png",
      mobile: "/images/home/main_slide/main_slide_1_m.jpg",
    },
    title: "??????????????? ???????????????",
    href: "/diagnosis",
    isRequireLogin: true,
  },
  {
    key: 1,
    source: {
      default: "/images/home/main_slide/main_slide_2.png",
      mobile: "/images/home/main_slide/main_slide_2_m.jpg",
    },
    title: "???????????? ????????? ????????????",
    href: "/loans",
    isRequireLogin: true,
  },
  {
    key: 2,
    source: {
      default: "/images/home/main_slide/main_slide_3.png",
      mobile: "/images/home/main_slide/main_slide_3_m.jpg",
    },
    title: "??????????????? ????????????",
    href: "/review/recent",
  },
  {
    key: 3,
    source: {
      default: "/images/home/main_slide/main_slide_4.png",
      mobile: "/images/home/main_slide/main_slide_4_m.jpg",
    },
    title: "????????? ??????????????? ????????????",
    href: "/plus/all",
  },
  {
    key: 4,
    source: {
      default: "/images/home/main_slide/main_slide_5.png",
      mobile: "/images/home/main_slide/main_slide_5_m.jpg",
    },
    title: "???????????? ?????????",
    href: "/mybankmall/diagnosis",
    isRequireLogin: true,
  },
  {
    key: 5,
    source: {
      default: "/images/home/main_slide/main_slide_1.png",
      mobile: "/images/home/main_slide/main_slide_1_m.jpg",
    },
    title: "??????????????? ???????????????",
    href: "/diagnosis",
    isRequireLogin: true,
  },
  {
    key: 6,
    source: {
      default: "/images/home/main_slide/main_slide_2.png",
      mobile: "/images/home/main_slide/main_slide_2_m.jpg",
    },
    title: "???????????? ????????? ????????????",
    href: "/loans",
    isRequireLogin: true,
  },
  {
    key: 7,
    source: {
      default: "/images/home/main_slide/main_slide_3.png",
      mobile: "/images/home/main_slide/main_slide_3_m.jpg",
    },
    title: "??????????????? ????????????",
    href: "/review/recent",
  },
];
const ThreeD = ({ bannerItems = item, adSlideTime = 5 }) => {
  // ???????????? ?????? + marginRight ??????
  const slideWidth = 420;
  // slideWidth??? ??? ??? ?????? ???????????? ??????

  console.log(bannerItems, "bannerItems");
  const [items, setItems] = useState([
    ...bannerItems,
    ...bannerItems,
    ...bannerItems,
    ...bannerItems,
  ]);
  const [move, setMove] = useState(0);
  const [popIndex, setPopIndex] = useState(0);

  const motionRef = useRef(null);
  // const moveTimer = useRef(null);
  // const RestPopIndex = useRef(0);

  const controls = useAnimationControls();

  // const onclick = useCallback(() => {
  //   const temp = [...items];
  //   temp.push(temp[popIndex]);
  //   temp[popIndex] = null;
  //   setItems(temp);
  // }, [popIndex]);

  // const changeMove = useCallback(() => {
  //   setMove((prev) => prev - slideWidth);
  //   console.log(popIndex, 'popIndex');

  //   setPopIndex((prev) => prev + 1);
  // }, []);

  useEffect(async () => {
    // moveTimer.current = setInterval(changeMove, duration * 1000);
    // return () => clearInterval(moveTimer.current);
  }, []);

  // useEffect(() => {
  //   console.log(items, 'itemsss');
  // }, [items]);

  // useEffect(() => {
  //   console.log(move, 'move');
  // }, [move]);

  // useEffect(() => {
  //   onclick();
  // }, [popIndex]);

  useEffect(() => {
    controls.set({ x: 0 });
    controls.start({ x: -20000 / adSlideTime });
    // controls.start({ x: -1000 });
  }, []);

  return (
    <>
      <div>sd</div>
      <Container>
        <motion.div
          ref={motionRef}
          style={{
            display: "flex",
            position: "absolute",
            justifyContent: "center",
          }}
          animate={controls}
          onMouseEnter={() => {
            controls.stop();
            // clearInterval(moveTimer.current);

            console.log(move, "onMouseEnter");
          }}
          onMouseLeave={() => {
            const temp = motionRef.current.style.webkitTransform.search("px");
            const temp2 = motionRef.current.style.webkitTransform.slice(
              11,
              temp
            );
            console.log(
              motionRef.current.style.webkitTransform.search("px"),
              move,
              "mouse"
            );
            console.log(
              motionRef.current.style.webkitTransform.slice(11, temp),
              "mouse"
            );
            console.log(motionRef.current.style.webkitTransform, move, "mouse");
            // RestPopIndex.current += (move - motionRef.current.offsetLeft) / slideWidth;
            // if (RestPopIndex.current >= 1) {
            //   setPopIndex((prev) => prev + 1);
            //   RestPopIndex.current--;
            // }
            // setMove(Number(temp2));
            // controls.set({ x: `${move}px` });
            controls.set({ x: Number(temp2) });

            controls.start({ x: Number(temp2) - 20000 / adSlideTime });
            // moveTimer.current = setInterval(changeMove, duration * 1000);
          }}
          transition={{
            delay: 0,
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items?.map((item, index) => {
            if (item === null) return <div style={{ width: slideWidth }} />;
            return (
              // <Link href={item.url}>
              // <a target={item.isNewOpen ? "_blank" : ""}>
              <SliderWrapper>
                <img src={item?.source.default} alt={item?.adTitle} />
                <TextGroup>
                  <h1>{item?.adTitle}</h1>
                  <h2>{item?.subTitle}</h2>
                  <h3>{item?.summation}</h3>
                </TextGroup>
                <div className="additional">{item?.adNumber}</div>
              </SliderWrapper>
              // </a>
              // </Link>
            );
          })}
        </motion.div>
      </Container>
    </>
  );
};

export default React.memo(ThreeD);

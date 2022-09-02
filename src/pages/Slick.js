/* eslint-disable import/no-unresolved */
import React, { useRef, useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import Carousel from "framer-motion-carousel";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

const items = [
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
const Container = styled.div`
  border: 2px solid red;
  width: calc(360px * 5 + 60px * 4);
  height: 480px;

  color: #fff;
  .slick-slide {
    width: 420px !important;
    height: 480px !important;
  }
`;
const SliderWrapper = styled.div`
  width: 560px !important;
  height: 480px;
  border: 3px solid green;
`;

const HomeBestOfBestList = () => {
  const [width, setWidth] = useState(0);
  // const variants = {
  //   enthideer: (direction: number) => {
  //     return {
  //       x: direction > 0 ? 1000 : -1000,
  //       opacity: 0
  //     };
  //   },
  //   reveal: {
  //     zIndex: 1,
  //     x: 0,
  //     opacity: 1
  //   },
  //   close: (direction: number) => {
  //     return {
  //       zIndex: 0,
  //       x: direction < 0 ? 1000 : -1000,
  //       opacity: 0
  //     };
  //   }
  // };
  const [index, setIndex] = useState(0);
  const boxRef = useRef(null);
  useEffect(() => {
    // if (!boxRef.current) return;
    // setWidth(boxRef.current?.clientWidth);
    // console.log(1000 - boxRef.current?.clientWidth);
    setInterval(() => {
      setIndex((PREV) => PREV + 1);
    }, [1000]);
    return () =>
      setInterval(() => {
        setIndex((PREV) => PREV + 1);
      }, [1000]);
  }, []);
  console.log(index);
  // const variants = {
  //   // hide: { left: 0 },
  //   reveal: { right: 0 },
  // };
  // const variants2 = {
  //   hide: { left: "-1000px" },
  //   reveal: {left: 0 },
  // };
  // const variants3 = {
  //   // hide: { left: 0 },
  //   reveal: { right: 0 },
  // };
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({ scale: 2 });
  }, []);
  return (
    <>
      <div>dd</div>
      <div>dd</div>
      <div>dd</div>
      <div>dd</div>
      <div>dd</div>
      <div>dd</div>
      <div>dd</div>
      <div>dd</div>
      <div>dd</div>
      <div>dd</div>
      <motion.div animate={controls}>motion.div</motion.div>
    </>
  );
  // return (
  {
    /* <img scr="/img/0.jpg" alt="0" />
     */
  }

  {
    /* <div>
        <motion.div
          style={{ x: 0 }}
          animate={{ x: 10 }}
          transition={{
            delay: 0,
            duration: 1,
            repeat: Infinity,
          }}
        >
          {index}
        </motion.div>
      </div> */
  }
  {
    /* {width && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              border: "1px solid red",
              marin: "0 auto",
            }}
          >
            <motion.div
            ref={boxRef}
            style={{
              display: "flex",
              border: "1px solid black",
              position: "absolute",
            }}
            variants={variants}
            initial="hide"
            animate="reveal"
            transition={{
              delay: 0,
              duration: 6,
              // repeat: Infinity,
            }}
          >
            {items?.map((item, index) => {
              return (
                <SliderWrapper>
                  <div>{item.title}</div>
                </SliderWrapper>
              );
            })}
          </motion.div>
            <motion.div
              ref={boxRef}
              style={{
                display: "flex",
                border: "1px solid black",
                position: "absolute",
              }}
              variants={variants2}
              initial="hide"
              animate="reveal"
              transition={{
                delay: 0,
                duration: 6,
                // repeat: Infinity,
              }}
            >
              {items?.map((item, index) => {
                return (
                  <SliderWrapper>
                    <div>{item.title}</div>
                  </SliderWrapper>
                );
              })}
            </motion.div>
            <motion.div
              ref={boxRef}
              style={{
                display: "flex",
                border: "1px solid black",
                position: "absolute",
              }}
              variants={variants2}
              initial="hide"
              animate="reveal"
              transition={{
                delay: 6,
                duration: 6,
                // repeat: Infinity,
              }}
            >
              {items?.map((item, index) => {
                return (
                  <SliderWrapper>
                    <div>{item.title}</div>
                  </SliderWrapper>
                );
              })}
            </motion.div>
          </div>
        </div>
      )} */
  }
  // );
};

export default HomeBestOfBestList;

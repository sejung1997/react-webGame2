import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";

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
const HomeBestOfBestList = ({ bannerItems = item, adSlideTime }) => {
  // 슬라이드 넓이 + marginRight 설정
  const slideWidth = 420;
  // slideWidth를 몇 초 동안 이동할지 설정

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
              <Link href={item.url}>
                <a target={item.isNewOpen ? "_blank" : ""}>
                  <SliderWrapper>
                    <img src={item?.source.default} alt={item?.adTitle} />
                    <TextGroup>
                      <h1>{item?.adTitle}</h1>
                      <h2>{item?.subTitle}</h2>
                      <h3>{item?.summation}</h3>
                    </TextGroup>
                    <div className="additional">{item?.adNumber}</div>
                  </SliderWrapper>
                </a>
              </Link>
            );
          })}
        </motion.div>
      </Container>
    </>
  );
};

export default React.memo(HomeBestOfBestList);

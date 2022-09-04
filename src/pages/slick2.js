import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

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
  width: 360px !important;
  height: 480px;
  border: 3px solid green;
  padding: 25px 20px 15px;
  display: flex !important;
  flex-direction: column !important;
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
  border: 1px solid yellow;
  z-index: 24;
  h1 {
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
const HomeBestOfBestList2 = () => {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    speed: 3000,
    autoplaySpeed: 0,
    // autoplay: true,
    cssEase: "linear",
    focusOnSelect: true,
    pauseOnHover: false,
    // pauseOnFocus: true,
  };
  React.useEffect(() => {}, []);
  return (
    <Container>
      {items.length > 4 ? (
        <Slider {...settings}>
          {items?.map((item, index) => {
            // return (
            //   <SwiperSlide key={`home-best-of-best-slide-${item.id}`}>
            //     <HomeBestOfBestListItem index={index} {...item} />
            //   </SwiperSlide>
            // );
            return (
              <SliderWrapper>
                <img src={item.source.default} alt={item.title} />
                <TextGroup>
                  <h1>{item.title}</h1>
                  <h2>h2h2h2h2h2h2h2</h2>
                  <h3>h3h3h3h3h3h3h3</h3>
                </TextGroup>
                <div className="additional">additional text</div>
              </SliderWrapper>
            );
          })}
        </Slider>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {items?.map((item, index) => {
            return (
              <SliderWrapper
                style={{ width: " 360px", height: "480px", margin: "0 30px" }}
                key={`home-best-of-best-slide-${item.id}`}
              ></SliderWrapper>
            );
          })}
        </div>
      )}
    </Container>
  );
};

export default React.memo(HomeBestOfBestList2);

import classNames from "#utils/classNames";
import React from "react";
import Link from "next/link";

import zf from "#utils/zf";
import styles from "./MainSlider.module.less";

import { useLogin } from "#context/login";
import { getBannerMain } from "#apis/banner";
import parseImageUrl from "#utils/parseImageUrl";

const MainSlider = ({ delay = 3000 }) => {
  const [index, setIndex] = React.useState(0);
  const [items, setItems] = React.useState([]);

  const slider = React.useRef(null);

  const { checkLogin } = useLogin();

  // const items = React.useMemo(
  //   () => [
  //     {
  //       key: 0,
  //       source: {
  //         default: '/images/home/main_slide/main_slide_1.png',
  //         mobile: '/images/home/main_slide/main_slide_1_m.jpg',
  //       },
  //       title: '담보대출을 디자인하다',
  //       href: '/diagnosis',
  //       isRequireLogin: true,
  //     },
  //     {
  //       key: 1,
  //       source: {
  //         default: '/images/home/main_slide/main_slide_2.png',
  //         mobile: '/images/home/main_slide/main_slide_2_m.jpg',
  //       },
  //       title: '당신만의 은행을 가지세요',
  //       href: '/loans',
  //       isRequireLogin: true,
  //     },
  //     {
  //       key: 2,
  //       source: {
  //         default: '/images/home/main_slide/main_slide_3.png',
  //         mobile: '/images/home/main_slide/main_slide_3_m.jpg',
  //       },
  //       title: '담보대출에 감동하다',
  //       href: '/review/recent',
  //     },
  //     {
  //       key: 3,
  //       source: {
  //         default: '/images/home/main_slide/main_slide_4.png',
  //         mobile: '/images/home/main_slide/main_slide_4_m.jpg',
  //       },
  //       title: '온라인 담보대출을 혁신하다',
  //       href: '/plus/all',
  //     },
  //     {
  //       key: 4,
  //       source: {
  //         default: '/images/home/main_slide/main_slide_5.png',
  //         mobile: '/images/home/main_slide/main_slide_5_m.jpg',
  //       },
  //       title: '뱅크몰에 빠지다',
  //       href: '/mybankmall/diagnosis',
  //       isRequireLogin: true,
  //     },
  //   ],
  //   [],
  // );

  const handleNextSlide = () => {
    setIndex((p) => (p >= items.length - 1 ? 0 : p + 1));
  };

  const handleChangeIndex = (i) => {
    setIndex(i);
    clearInterval(slider.current);
    slider.current = setInterval(handleNextSlide, delay);
  };

  React.useEffect(() => {
    if (!(items.length > 0)) {
      return null;
    }
    clearInterval(slider.current);
    slider.current = setInterval(handleNextSlide, delay);
    return () => {
      clearInterval(slider.current);
    };
  }, [items]);

  React.useEffect(async () => {
    const { data } = await getBannerMain();
    const items = data?.map((item, index) => {
      return {
        key: index,
        source: {
          default: parseImageUrl(item?.attachFileId),
          mobile: parseImageUrl(item?.mobileAttachFileId),
        },
        title: item?.attachFileReplace,
        href: item?.url,
        isRequireLogin: item?.isNewOpen,
      };
    });

    setItems(items);
  }, []);

  return (
    <div className={styles["container"]}>
      <div className={styles["slider"]}>
        {items?.map(({ key, source, href, title, isRequireLogin }, i) => {
          const active = index === i;
          return (
            <div
              key={`main-slide-${key}`}
              className={classNames(
                styles["slide"],
                active && styles["active"]
              )}
            >
              <Link href={href}>
                <a
                  className={styles["slide-image"]}
                  title="해당 페이지로 가기"
                  onClick={(e) => {
                    if (isRequireLogin === true && checkLogin(href) === false) {
                      e.preventDefault();
                    }
                  }}
                >
                  <picture>
                    <source media="(max-width: 768px)" srcSet={source.mobile} />
                    <img src={source.default} alt={title} />
                  </picture>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      <div className={styles["inner"]}>
        <div className={styles["pagination"]}>
          <span className={styles["current-page"]}>
            {zf(index + 1, `${items.length}`.length + 1)}
          </span>
          <div className={styles["controller-container"]}>
            {items.map((_, i) => {
              const active = index === i;
              const onClick = () => {
                handleChangeIndex(i);
              };
              return (
                <button
                  key={`main-slide-pagination-${i}`}
                  className={classNames(
                    styles["controller"],
                    active && styles["active"]
                  )}
                  onClick={onClick}
                  type="button"
                >
                  Go to Slide {i}
                </button>
              );
            })}
            <span
              className={styles["current-page-line"]}
              style={{
                width: `${items.length !== 0 ? 100 / items.length : 100}%`,
                left: `${(100 / items.length) * index}%`,
              }}
            >
              {index}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainSlider);

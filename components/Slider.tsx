import React, { useEffect, useState } from "react";

type SliderType = {
  cards: any[];
  slidesVisibleCount: number;
};

const Slider = ({ cards, slidesVisibleCount = 3 }: SliderType) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [imagesStyle, setImagesStyle] = useState([
    "absolute top-0 left-0 scale-100 z-30 rounded-xl ease-in transition-all duration-500 w-[200px] h-[300px] shadow-2xl shadow-inner",
    "absolute top-0 left-[80px] scale-75 z-20 rounded-xl ease-in transition-all duration-500 w-[200px] h-[300px]  shadow-2xl shadow-inner",
    "absolute top-0 left-[130px] scale-50 z-10 rounded-xl ease-in transition-all duration-500 w-[200px] h-[300px]  shadow-2xl shadow-inner",
    "absolute top-0 left-0 rounded-xl hidden transition-all ease-in duration-500 w-[200px] h-[300px]  shadow-2xl shadow-inner",
  ]);

  const slideLeft = () => {
    console.log("slideleft");
    const newImagesStyle = imagesStyle.map((style, index) => {
      if (index === 0) {
        return imagesStyle[imagesStyle.length - 1];
      } else {
        return imagesStyle[index - 1];
      }
    });

    setImagesStyle(newImagesStyle);
  };

  const slideRight = () => {
    console.log("slideRight");
    const newImagesStyle = imagesStyle.map((style, index) => {
      if (index === imagesStyle.length - 1) {
        return imagesStyle[0];
      } else {
        return imagesStyle[index + 1];
      }
    });

    setImagesStyle(newImagesStyle);
  };

  // sliding automatically
  useEffect(() => {
    const interval = setInterval(() => {
      slideLeft();
    }, 4000);
    return () => clearInterval(interval);
  });

  const positionRef = React.useRef(0);

  const mouseMove = (e: any) => {
    console.log("xxx");

    if (mouseDown) {
      // console.log(e.clientX);
      // console.log("xxxxxx");
      // console.log(positionRef.current);
      if (e.clientX - 10 > positionRef.current) {
        slideRight();
        setMouseDown(false);
      }
      if (e.clientX + 10 < positionRef.current) {
        slideLeft();
        setMouseDown(false);
      }
    }
  };

  const touchMove = (e: any) => {
    if (mouseDown) {
      // console.log(e.clientX);
      // console.log("xxxxxx");
      // console.log(positionRef.current);
      if (e.touches[0].clientX - 10 > positionRef.current) {
        slideRight();
        setMouseDown(false);
      }
      if (e.touches[0].clientX + 10 < positionRef.current) {
        slideLeft();
        setMouseDown(false);
      }
    }
  };

  const horizontalScroll = (e: any) => {
    console.log(e.deltaX);

    if (e.deltaX > 10) {
      slideRight();
    } else {
      slideLeft();
    }
  };

  return (
    <>
      <div>
        <button onClick={slideLeft}>Left</button>
        <button onClick={slideRight}>Right</button>
      </div>
      <div
        className="relative border w-[300px] h-[300px] z-40 cursor-pointer"
        onMouseMove={mouseMove}
        onMouseDown={(event) => {
          setMouseDown(true);
          positionRef.current = event.clientX;
        }}
        onTouchEnd={() => setMouseDown(false)}
        onTouchMove={touchMove}
        onTouchStart={(event) => {
          setMouseDown(true);
          positionRef.current = event.touches[0].clientX;
        }}
        onMouseUp={() => setMouseDown(false)}
        onWheel={horizontalScroll}
      >
        {cards.map((card, index) => {
          return (
            <div key={index} className={imagesStyle[index]}>
              {card}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Slider;

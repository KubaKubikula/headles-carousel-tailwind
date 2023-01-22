import React, {
  createContext,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
import {
  CarouselContextType,
  CarouselItemType,
  CarouselDotType,
  CarouselSlidesContainerType,
  CarouselType,
} from "./types/types";
import { useCarousel } from "./hooks/useCarousel";

const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarouselContext = () => {
  const context = useContext(CarouselContext);
  if (context === undefined || context === null) {
    throw new Error(
      "useCarouselContext must be used inside a <Carousel></Carousel> fragment !"
    );
  }
  return context;
};

const Carousel = ({ children, ...restProps }: CarouselType) => {
  return (
    <CarouselContext.Provider value={{ ...useCarousel() }}>
      <div data-testid="carousel" {...restProps}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

Carousel.LeftArrow = ({ children, ...restProps }: CarouselItemType) => {
  const { prevSlide } = useCarouselContext();

  return (
    <button data-testid="left-arrow" onClick={() => prevSlide()} {...restProps}>
      {children}
    </button>
  );
};

Carousel.RightArrow = ({ children, ...restProps }: CarouselItemType) => {
  const { nextSlide } = useCarouselContext();

  return (
    <button onClick={() => nextSlide()} {...restProps}>
      {children}
    </button>
  );
};

Carousel.Dot = ({ children, index, ...restProps }: CarouselDotType) => {
  const { goToSlide, slideIndex } = useCarouselContext();

  return (
    <button
      onClick={() => {
        goToSlide(index);
      }}
      {...restProps}
      className={
        slideIndex === index ? restProps.activeClassName : restProps.className
      }
    >
      {children}
    </button>
  );
};

Carousel.SlidesContainer = ({
  children,
  spaceBetweenSlides = 0,
  ...restProps
}: CarouselSlidesContainerType) => {
  const {
    slideIndex,
    isTransition,
    goToSlide,
    nextSlide,
    mouseMove,
    touchMove,
    onTouchStart,
    onMouseDown,
    dragDifference,
    mouseUp,
  } = useCarouselContext();
  const [width, setWidth] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [ref]);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  useEffect(() => {
    const interval = setInterval((): void => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  });

  const slidesArray = React.Children.toArray(children);

  if (slideIndex < 0) {
    setTimeout(() => {
      goToSlide(slidesArray.length - 1, false);
    }, 400);
  }

  if (slideIndex > slidesArray.length - 1) {
    setTimeout(() => {
      goToSlide(0, false);
    }, 400);
  }

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <div
        style={{
          transform: `translateX(-${
            (slideIndex + 1) * (width + spaceBetweenSlides) - dragDifference
          }px)`,
          transition: isTransition ? "transform ease-out 0.4s" : "none",
          display: "flex",
          gap: spaceBetweenSlides,
          cursor: "grab",
        }}
        {...restProps}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onMouseMove={mouseMove}
        onTouchMove={touchMove}
        onMouseUp={() => mouseUp()}
        onTouchEnd={() => mouseUp()}
      >
        <div>
          <div style={{ width: width }}>
            {slidesArray.find(
              (_slide, index) => index === slidesArray.length - 1
            )}
          </div>
        </div>
        {slidesArray.map((slide, index) => {
          return (
            <div key={index}>
              <div style={{ width: width }}>{slide}</div>
            </div>
          );
        })}
        <div>
          <div style={{ width: width }}>
            {slidesArray.find((_slide, index) => index === 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

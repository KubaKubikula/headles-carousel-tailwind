import React, { useRef, useState } from "react";

interface IUseCarouselReturn {
  slideIndex: number;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  mouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  touchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  mouseUp: () => void;
  isTransition: boolean;
  dragDifference: number;
}

export const useCarousel = (): IUseCarouselReturn => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const positionRef = useRef<number>(0);
  const [mouseOrTouchDown, setMouseOrTouchDown] = useState<boolean>(false);
  const [dragDifference, setDragDifference] = useState<number>(0);
  const [isTransition, setIsTransition] = useState<boolean>(false);
  const sensitivity = 40;

  const nextSlide = (transition = true): void => {
    if (isTransition !== transition) setIsTransition(transition);
    setSlideIndex(slideIndex + 1);
  };

  const prevSlide = (transition = true): void => {
    if (isTransition !== transition) setIsTransition(transition);
    setSlideIndex(slideIndex - 1);
  };

  const goToSlide = (index: number, transition = true): void => {
    if (isTransition !== transition) setIsTransition(transition);
    setSlideIndex(index);
  };

  const mouseUp = (): void => {
    setIsTransition(true);
    setMouseOrTouchDown(false);
    setDragDifference(0);
  };

  const mouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (mouseOrTouchDown) {
      setDragDifference(e.clientX - positionRef.current);
      if (e.clientX - sensitivity > positionRef.current) {
        prevSlide();
        setMouseOrTouchDown(false);
        mouseUp();
      }
      if (e.clientX + sensitivity < positionRef.current) {
        nextSlide();
        mouseUp();
      }
    }
  };

  const touchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (mouseOrTouchDown) {
      setDragDifference(e.touches[0].clientX - positionRef.current);
      if (e.touches[0].clientX - sensitivity > positionRef.current) {
        prevSlide();
        mouseUp();
      }
      if (e.touches[0].clientX + sensitivity < positionRef.current) {
        nextSlide();
        mouseUp();
      }
    }
  };

  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    positionRef.current = e.clientX;
    setMouseOrTouchDown(true);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    positionRef.current = e.touches[0].clientX;
    setMouseOrTouchDown(true);
  };

  return {
    slideIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    mouseMove,
    touchMove,
    onMouseDown,
    onTouchStart,
    isTransition,
    dragDifference,
    mouseUp,
  };
};

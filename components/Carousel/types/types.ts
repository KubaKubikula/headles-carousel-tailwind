import React, { ReactNode } from "react";

export type CarouselContextType = {
  slideIndex: number;
  prevSlide: () => void;
  nextSlide: () => void;
  goToSlide: (index: number, transition?: boolean) => void;
  mouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  touchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  mouseUp: () => void;
  isTransition: boolean;
  dragDifference: number;
};

export type CarouselItemType = {
  children: ReactNode | ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  index?: number;
};

export type CarouselDotType = {
  children?: ReactNode | ReactNode[] | undefined;
  className?: string;
  activeClassName?: string;
  style?: React.CSSProperties;
  index: number;
  key: number;
};

export type CarouselSlidesContainerType = {
  children: ReactNode | ReactNode[];
  spaceBetweenSlides?: number;
  className?: string;
  style?: React.CSSProperties;
};

export type CarouselType = {
  children: ReactNode | ReactNode[];
  className?: string;
  style?: React.CSSProperties;
};

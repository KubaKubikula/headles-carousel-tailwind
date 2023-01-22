import React from "react";
import Carousel from "../components/Carousel/Carousel";
import { dataCarousel } from "../mock/dataCarousel";

export default function Home() {
  return (
    <Carousel className="w-full max-w-4xl">
      <div className="flex flex-row">
        <Carousel.LeftArrow>left</Carousel.LeftArrow>
        <Carousel.SlidesContainer spaceBetweenSlides={10}>
          {dataCarousel.map((item, index) => (
            <div
              key={index}
              className="text-white h-full pt-7 pb-16 md:pt-9 md:pb-[72px] px-12 md:px-16 mx-1 rounded-3xl flex flex-col items-center justify-around space-y-6 bg-gradient-to-r from-cyan-500 to-blue-500"
            >
              <img
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-xl">{item.description}</p>
            </div>
          ))}
        </Carousel.SlidesContainer>
        <Carousel.RightArrow className="hover:text-white text-gray">
          right
        </Carousel.RightArrow>
      </div>
      <div className="flex justify-center items-center py-4">
        {dataCarousel.map((item, index) => (
          <Carousel.Dot
            index={index}
            key={index}
            className="w-4 h-4 rounded-full bg-gray-300"
            activeClassName="w-4 h-4 rounded-full bg-blue-600"
          />
        ))}
      </div>
    </Carousel>
  );
}

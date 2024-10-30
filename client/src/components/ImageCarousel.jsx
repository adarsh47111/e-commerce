import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function ImageCarousel({ imageList }) {
  if (imageList === undefined || imageList.length === 0) return null;

  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {imageList.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt="image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

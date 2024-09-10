import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const Slider = () => {
  return (
    <div className="">
      <Swiper
        className=" lg:rounded-2xl z-0 mt-5"
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay 
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img className="w-full object-cover" src='https://i.ibb.co/ZRjXN12/2.jpg' alt="" />
        </SwiperSlide>
        <SwiperSlide>
          
          <img className="w-full object-cover" src="https://i.ibb.co/fNpRfdp/3.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          
          <img  className="w-full object-cover" src="https://i.ibb.co/12FvKtx/1.jpg" alt="" />
        </SwiperSlide>
        
      </Swiper>
     

      



      {/* <div className="absolute top-1/2 right-1/2 translate-x-1/2 z-30">
      <h1 className="bg-gradient-to-r text-center from-blue to-green font-extrabold text-5xl text-green text-transparent bg-clip-text">
        Wrold First Class Hotel <br></br> Mangrove Hotel
      </h1>
    </div> */}

    </div>
    
  );
};

export default Slider;

import React from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import 'swiper/swiper-bundle.css'; 
import useReviews from '../Hooks/useReviews';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Rating from 'react-rating';

import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Details = () => {

  const item = useLoaderData();
  console.log(item)
  const [reviews] = useReviews();
  const axiosPublic = useAxiosPublic()
  const {
    scholarshipName, university_name, university_image, universityCountry,
    universityCity, universityWorldRank, subjectCategory, scholarshipCategory,
    degree, tuitionFees, applicationFees, serviceCharge, applicationDeadline,
    scholarshipPostDate, _id
  } = item; 
  const { user } = useAuth();

  const handleScholar = () => {
    const totalFee = serviceCharge + applicationFees;

  // Create the data object to send
  const dataInfo = {
    totalFee,
    _id
  };
  
  
  axiosPublic.post('/payment', dataInfo)
      .then(res => {
        window.location.replace(res.data.url)
      })


  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div>
          <figure className="border p-2">
            <img src={university_image} alt="University" className="" />
          </figure>
          <h2>{university_name}</h2>
          <p>Category: {scholarshipCategory}</p>
          <p>Publish: {scholarshipPostDate}</p>
          <p>Country: {universityCountry}</p>
          <p>City: {universityCity}</p>
          <p>Deadline: {applicationDeadline}</p>
          <p>Subject Category: {subjectCategory}</p>
          <p>Application Fees: {applicationFees}</p>
          <p>Application Fees: {serviceCharge}</p>
         
          {/* onClick={ handleScholar} */}
         <Link  to={`/ApplyScholar/${_id}`}>
            <button  className="btn btn-outline my-4">Apply Scholarship</button>
            </Link>
        </div>
      </div>

      <div className='py-10'>

        <div className='flex justify-center items-center py-10'>
        <h1 className='text-4xl'>All Reviews</h1>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          className='cursor-pointer'
          pagination={{ clickable: true }}
        //   scrollbar={{ draggable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {reviews.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="text-center flex flex-col justify-center shadow-md rounded-xl dark:bg-gray-50 dark:text-gray-800 space-y-3 border py-3 px-1">
                <img className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" src={item.user_image} alt={item.user_name} />
                <div className="my-2 space-y-1">
                  <h2 className="text-xl font-semibold sm:text-2xl">{item.user_name}</h2>
                  <p className="px-5 text-xs sm:text-base dark:text-gray-600">Date: {item.currentDate}</p>
                </div>
                <div className="my-2 space-y-1">
                  <h2 className="text-sm font-semibold sm:text-2xl">{item.university_name}</h2>
                  <p className="px-5 text-xl">{item.scholarshipName}</p>
                </div>
                <Rating
                  initialRating={item.rating}
                  readonly
                  emptySymbol={<FaRegStar />}
                  fullSymbol={<FaStar className="text-yellow-500" />}
                />
                <p>{item.review_comment}</p>
             
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Details;

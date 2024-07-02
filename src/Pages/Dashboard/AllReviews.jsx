import React from 'react'
import useReviews from '../../Hooks/useReviews'
import Rating from 'react-rating'
import { FaTrashAlt } from 'react-icons/fa'
import useAxiosSecure from '../../Hooks/useAxioxSecure'
import { FaRegStar, FaStar } from 'react-icons/fa6'
import Swal from 'sweetalert2'

const AllReviews = () => {
  const [reviews, refetch] = useReviews()
  const axiosSecure = useAxiosSecure()

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/allreviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };




  return (
    <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  

       
      {reviews.map(item => <div key={item._id} className="text-center flex flex-col justify-center shadow-md rounded-xl  dark:bg-gray-50 dark:text-gray-800 space-y-3 border py-3 px-1">
        <p><img className='w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square' src={item.user_image} alt="" /></p>
        <div className="my-2 space-y-1">
			<h2 className="text-xl font-semibold sm:text-2xl">{item.user_name}</h2>
			<p className="px-5 text-xs sm:text-base dark:text-gray-600">Date: {item.currentDate}</p>
		</div>
        <div className="my-2 space-y-1">
			<h2 className="text-sm font-semibold sm:text-2xl">{item.university_name}</h2>
			<p className="px-5 text-xl">{item.scholarshipName}</p>
		</div>
        
      
        <p><Rating
        initialRating={item.rating}
        readonly={true}
        emptySymbol={<FaRegStar></FaRegStar>}
        fullSymbol={<FaStar className='text-yellow-500'></FaStar>}
      /></p>
        <p>{item.review_comment}</p>
        <button onClick={() => handleDelete(item._id)} className="btn btn-ghost bg-slate-300">
                   Delete
                  </button>
        
      </div>)}
       
    
 
</div>
      
    
      </>
  )
}

export default AllReviews
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import useAuth from "../../Hooks/useAuth";
import useMyReview from "../../Hooks/useMyReview";
import useAxiosSecure from "../../Hooks/useAxioxSecure";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa6";

const MyReview = () => {
  const [review, refetch] = useMyReview();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [currentItemId, setCurrentItemId] = useState(null);
  const [rating, setRating] = useState(0);
  const { user } = useAuth();

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const openModal = (item) => {
    setCurrentItemId(item._id);

    
    setValue("university_name", item.university_name);
    setValue("scholarshipName", item.scholarshipName);
    setValue("review_comment", item.review_comment);
    setRating(item.rating || 0);

    document.getElementById(`modal_${item._id}`).showModal();
  };

  const closeModal = () => {
    setCurrentItemId(null);
    reset(); // Reset form fields
    setRating(0); // Reset rating state
    document.getElementById(`modal_${currentItemId}`).close();
  };

  const onSubmit = async (data) => {
    const currentDate = new Date().toLocaleDateString();
    const user_image = user?.photoURL;
    const user_email = user?.email;
    const user_name = user?.displayName;
    const editData = {
      ...data,
      rating,
      currentDate,
      user_image,
      user_email,
      user_name,
    };

    try {
      const res = await axiosSecure.patch(`/review/updateItem/${currentItemId}`, editData);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Review Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        closeModal();
      } else {
        toast.error("Failed to update review");
      }
    } catch (error) {
      toast.error("An error occurred while updating the review");
      console.error("Error updating review:", error);
    }
  };

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
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-center">
          <h1>All Of My Review: {review.length}</h1>
        </div>

        <table className="table text-sm w-full">
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>UN Name</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Review Date</th>
              <th>Cancel</th>
              <th>Edit</th>
             
              
            </tr>
          </thead>
          <tbody>
            {review.map((item) => (
              <tr key={item._id}>
                <td>{item.scholarshipName}</td>
                <td>{item.university_name}</td>
                <td>{item.review_comment}</td>
                <td>  <Rating
        initialRating={item.rating}
        readonly={true}
        emptySymbol={<FaRegStar></FaRegStar>}
        fullSymbol={<FaStar className='text-yellow-500'></FaStar>}
      /></td>
                <td>{item.currentDate}</td>
             

                <td>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-ghost">
                    <FaTrashAlt />
                  </button>
                </td>
                <td>
                  <button className="btn" onClick={() => openModal(item)}>
                    <FaEdit />
                  </button>
                  <dialog id={`modal_${item._id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Update</h3>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <ReactStars
                          count={5}
                          value={rating}
                          onChange={ratingChanged}
                          size={24}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                        />
                        <div>
                          <label htmlFor="">University Name</label>
                          <input
                            type="text"
                            {...register("university_name")}
                            className="border border-gray-300 rounded-md p-2 w-full"
                          />
                        </div>
                        <div>
                          <label htmlFor="">Scholarship Name</label>
                          <input
                            type="text"
                            {...register("scholarshipName")}
                            className="border border-gray-300 rounded-md p-2 w-full"
                          />
                        </div>
                        <div>
                          <label htmlFor="">Review Comment</label>
                          <textarea
                            {...register("review_comment")}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            rows={4}
                          ></textarea>
                        </div>
                        <button type="submit" className="btn">
                          Update Review
                        </button>
                      </form>
                      <button className="btn mt-4" onClick={closeModal}>
                        Close
                      </button>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReview;

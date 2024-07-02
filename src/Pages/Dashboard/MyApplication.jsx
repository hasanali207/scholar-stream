import React, { useState } from "react";
import useScholarItems from "../../Hooks/useScholarItems";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxioxSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import useAuth from "../../Hooks/useAuth";

const MyApplication = () => {
  const [scholaritems, refetch] = useScholarItems();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [currentItemId, setCurrentItemId] = useState(null);
  const [rating, setRating] = useState(0);
  const { user } = useAuth();

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const openModal = (itemId) => {
    setCurrentItemId(itemId);
    document.getElementById(`modal_${itemId}`).showModal();
  };

  const closeModal = () => {
    setCurrentItemId(null);
    reset();
    document.getElementById(`modal_${currentItemId}`).close();
  };

  const onSubmit = (data) => {
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
      currentItemId, 
    };

    axiosSecure.post(`/reviews`, editData);

    Swal.fire({
      position: "center",
      icon: "success",
      title: `Revies Added Successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    closeModal();
  };

  const handleClick = () => {
    toast.error("You cannot edit. It is being processed");
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
        axiosSecure.delete(`/scholaritems/${id}`).then((res) => {
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
          <h1>Your Application: {scholaritems.length}</h1>
        </div>

        <table className="table text-sm w-full">
          <thead>
            <tr>
              <th>UN Name</th>
              <th>UN: Address</th>
              <th>App: Feedback</th>
              <th>Subject Cat:</th>
              <th>Apply Degree</th>
              <th>Apply Fees</th>
              <th>Services Charge</th>
              <th>Status</th>
              <th>Details</th>
              <th>Edit</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {scholaritems.map((item) => (
              <tr key={item._id}>
                <td>{item.university_name}</td>
                <td>{item.university_address}</td>
                <td>{item.feedback}</td>
                <td>{item.subjectCategory}</td>
                <td>{item.degree}</td>
                <td>{item.applicationFees}</td>
                <td>{item.serviceCharge}</td>
                <td>{item.status}</td>
                <td>
                  <Link to={`/items/${item.itemId}`}>
                    <button className="btn btn-ghost">
                      <FaEye />
                    </button>
                  </Link>
                </td>
                <td>
                  {item.status === "processing" ? (
                    <button className="btn btn-ghost" onClick={handleClick}>
                      <FaEdit />
                    </button>
                  ) : (
                    <Link to={`/dashboard/scholaritem/update/${item._id}`}>
                      <button className="btn btn-ghost">
                        <FaEdit />
                      </button>
                    </Link>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
                <td>
                  <button className="btn" onClick={() => openModal(item._id)}>
                    Add Review
                  </button>
                  <dialog id={`modal_${item._id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Review Form</h3>
                      <form onSubmit={handleSubmit(onSubmit)}>
                       
                          <ReactStars
                            count={5}
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
                            defaultValue={item.university_name}
                            {...register("university_name")}
                            className="border border-gray-300 rounded-md p-2 w-full"
                          />
                        </div>
                        <div>
                          <label htmlFor="">Scholarship Name</label>
                          <input
                            type="text"
                            {...register("scholarshipName")} 
                            defaultValue={item.scholarshipName}
                            className="border border-gray-300 rounded-md p-2 w-full"
                          />
                        </div>

                        <div>
                          <label htmlFor="">Review Comment</label>
                          <textarea
                            {...register("review_comment")}
                            className="border border-gray-300 rounded-md p-2 w-full"
                            rows={4}
                            defaultValue='Add Your Comment'
                          ></textarea>
                        </div>
                        <button type="submit" className="btn">
                          Add Review
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

export default MyApplication;

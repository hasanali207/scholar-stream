import React, { useState } from "react";
import useAllScholarItems from "../../Hooks/useAllScholarItems";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxioxSecure";

const AppliedApplication = () => {
  const [allscholaritems, refetch] = useAllScholarItems();
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState("");
  const [currentItemId, setCurrentItemId] = useState(null);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    axiosSecure
      .patch(`/feedback/${currentItemId}`, { feedback })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Feedback Sent Successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          setFeedback("");
          setCurrentItemId(null);
          document.getElementById(`modal_${currentItemId}`).close();
        }
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);
      });
  };

  const handleStatus = (id) => {
    axiosSecure
      .patch(`/user/status/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Your Data Is Now Procceed`,
            showConfirmButton: false,
            timer: 1500,
          });
          
        }
      })
      .catch((error) => {
        console.error("Error sending feedback:", error);
      });
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
        axiosSecure.delete(`/allscholaritems/${id}`).then((res) => {
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

  const openModal = (id) => {
    setCurrentItemId(id);
    document.getElementById(`modal_${id}`).showModal();
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex justify-center">
          <h1>Total Application: {allscholaritems.length}</h1>
        </div>

        <table className="table text-sm w-full">
          {/* head */}
          <thead>
            <tr>
              <th>University Name</th>
              <th>UN: Address</th>
              <th>App: Feedback</th>
              <th>Subject Cat:</th>
              <th>Applied Degree</th>
              <th>Services Charge</th>
              <th>App: Status</th>
              <th>Details</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {allscholaritems.map((item) => (
              <tr key={item._id}>
                <td>{item.university_name}</td>
                <td>{item.university_address}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => openModal(item._id)}
                  >
                    Add Feedback
                  </button>
                  <dialog id={`modal_${item._id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Feedback Form</h3>
                      <p className="py-4">Please provide your feedback:</p>
                      <textarea
                        value={feedback}
                        onChange={handleFeedbackChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        rows={4}
                      ></textarea>
                      <button className="btn" onClick={handleSubmitFeedback}>
                        Submit Feedback
                      </button>
                      <button
                        className="btn"
                        onClick={() => document.getElementById(`modal_${item._id}`).close()}
                      >
                        Close
                      </button>
                    </div>
                  </dialog>
                </td>
                <td>{item.subjectCategory}</td>
                <td>{item.degree}</td>
                <td>{item.serviceCharge}</td>
                <td>
                  {item.status === "processing" ? (
                    <button className="">{item.status}</button>
                  ) : (
                    <Link onClick={() => handleStatus(item._id)}>
                      <button className="btn btn-ghost">{item.status}</button>
                    </Link>
                  )}
                </td>
                <td>
                  <Link to={`/items/${item.itemId}`}>
                    <button className="btn btn-ghost">
                      <FaEye />
                    </button>
                  </Link>
                </td>
                
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedApplication;

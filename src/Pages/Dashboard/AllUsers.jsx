import React from "react";
import useAxiosSecure from "../../Hooks/useAxioxSecure";
import { useQuery } from "@tanstack/react-query";
import { FaDeleteLeft, FaPaintbrush, FaUsers } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAdmin from "../../Hooks/useAdmin";
import useModerator from "../../Hooks/useModerator";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator()
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} is Moderator Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
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
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });

        axiosSecure.delete(`/users/${id}`).then((res) => {
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
      <div className="flex justify-center items-center text-2xl py-3">
        <h1>All Users ({users.length})</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>
                 
                  {user.role === "admin" ? (
                    "Admin"
                  ) : user.role === "moderator" ? (
                    "Moderator"
                  ) : (
                    <button
                      className="btn btn-ghost bg-red-300"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>

                <td>
                  {
                    user.role === 'admin'? ( <><button
                      className="btn btn-ghost bg-red-300"
                      onClick={() => handleDelete(user._id)} disabled
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button></>) : (  <><button
                      className="btn btn-ghost bg-red-300"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button></>)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;

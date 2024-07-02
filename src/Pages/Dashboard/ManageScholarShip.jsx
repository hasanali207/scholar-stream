import React from 'react'
import useItems from '../../Hooks/useItems'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa6'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../Hooks/useAxioxSecure'

const ManageScholarShip = () => {
  const [items, refetch] = useItems()
  const axiosSecure = useAxiosSecure()

  const handleDelete = (id) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });

        axiosSecure.delete(`/items/${id}`)
        .then(res => {
          if(res.data.deletedCount > 0){
            Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        refetch()
          }
        })
      }
    });


  }

  return (
    <div>


      
<div className="overflow-x-auto">
    <div className='flex justify-center'>
        <h1> Scholarship List: {items.length}</h1>
    </div>

  <table className="table text-sm w-full">
    {/* head */}
    <thead>
      <tr>
        <th>ScholarSip Name</th>
        <th>University Name</th>
        <th>Subject Category</th>
        <th>Applied Degree</th>
        <th>Application fee</th>
        <th>Details</th>
        <th>Edit</th>
        <th>Cancel</th>
       
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
    {
        items.map((item) =>   <tr key={item._id} >
            <td>{item.scholarshipName}</td>
            <td>{item.university_name}</td>
            <td>{item.subjectCategory}</td>
            <td>{item.degree}</td>
            <td>{item.applicationFees}</td>
          
            <td><Link to={`/items/${item._id}`}><button className='btn btn-ghost'><FaEye></FaEye></button></Link></td>
            <td><Link to={`/dashboard/items/update/${item._id}`}><button  className='btn btn-ghost'><FaEdit></FaEdit></button></Link></td>
            <td><button onClick={()=>handleDelete(item._id)} className='btn btn-ghost'><FaTrashAlt></FaTrashAlt></button></td>            
            
          </tr>)
    }
        
    </tbody>
  </table>
</div>

    </div>
  )
}

export default ManageScholarShip
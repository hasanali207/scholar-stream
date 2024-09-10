import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxioxSecure";
import { IoTime } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

const Sidebar = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: items = [] } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/items`);
      return res.data;
    }
  });

  






  return (
    <>
      <div className="flex  justify-between mt-10 ">
        
        

      </div>

      <div className="flex flex-col gap-6">
        {items.length > 0 && items.slice(0,3).map(item => (
          <div key={item._id} className="card border bg-white">
           <Link to={`/items/${item._id}`}> <figure className="border-b p-2">
              <img src={item.university_image} alt="Shoes"className="transition-transform duration-300 transform hover:scale-105" />
            </figure></Link>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item.university_name}</h2>
              <p>{item.scholarship_category }</p>
           <div className="flex items-center space-x-2"> <FaMapMarkerAlt />   <p>{item.universityCountry }, {item.universityCity}</p>
              
             </div>
              <p> <strong>Application Fees:</strong> {item.applicationFees } <strong>$</strong></p>
             
             <p> <strong>Post Date:</strong> {item.scholarshipPostDate }</p>
             <p> <strong>Deadline:</strong> {item.applicationDeadline }</p>
            
              <div className="card-actions">
                <Link to={`/items/${item._id}`}>
                  <button className="btn font-medium text-white hover:bg-green-500  bg-green-600 my-4 ml-3">
                    VIEW DETAILS
                  </button>
                </Link>
              </div>  
            </div>
          </div>
        ))}
      </div> 


      
    </>
  );
}

export default Sidebar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxioxSecure";

const AllScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: items = [] } = useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/items`);
      return res.data;
    }
  });

  const [sortedItems, setSortedItems] = useState([...items]);
  

  useEffect(() => {
    setSortedItems([...items]);
  }, [items]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
    

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-4 lg:p-0">
        {items.length > 0 && currentItems.map(item => (
          <div key={item._id} className="card border">
            <figure className="border-b p-2">
              <img src={item.university_image} alt="Shoes" className="" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item.university_name}</h2>
              <p>{item.scholarship_category }</p>
              <p>{item.universityCountry }, {item.universityCity}</p>
              <p>Application Fees: {item.applicationFees }</p>
             
             <p>Post Date: {item.scholarshipPostDate }</p>
             <p>Deadline: {item.applicationDeadline }</p>
              <div className="card-actions">
                <Link to={`/items/${item._id}`}>
                  <button className="btn btn-outline my-4 ml-3">
                    View Details
                  </button>
                </Link>
              </div>  
            </div>
          </div>
        ))}
      </div> 


      <div className="flex justify-center gap-3 mt-5">
       
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className="btn bg-green-300">
            {number}
          </button>
        ))}
      
             </div>
    </>
  );
}

export default AllScholarship;

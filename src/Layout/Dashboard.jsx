import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import useAdmin from '../Hooks/useAdmin';
import useModerator from '../Hooks/useModerator';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  
  return (
    <>
      <Navbar />
      <div className='flex flex-col lg:flex-row w-7xl mx-auto'>
        <div className=' w-full lg:w-52 lg:min-h-screen bg-slate-200'>
          <ul className="menu">
            {isAdmin ? (
              <>
                <li><NavLink to='/dashboard/profile'>Admin Profile</NavLink></li>
                <li><NavLink to='/dashboard/scholarshiform'>Add Scholarship</NavLink></li>
                <li><NavLink to='/dashboard/manageScholarshiform'>Manage Scholarship</NavLink></li>
                <li><NavLink to='/dashboard/allapplyscholarship'>Manage Apply Scholarship</NavLink></li>
                <li><NavLink to='/dashboard/allusers'>Manage Users</NavLink></li>
                <li><NavLink to='/dashboard/allreview'>Manage Reviews</NavLink></li>
              </>
            ) : isModerator ? (
              <>
                <li><NavLink to='/dashboard/profile'>Moderator Profile</NavLink></li>
                <li><NavLink to='/dashboard/scholarshiform'>Add Scholarship</NavLink></li>
                <li><NavLink to='/dashboard/manageScholarshiform'>Manage Scholarship</NavLink></li>
                <li><NavLink to='/dashboard/allapplyscholarship'>Manage Apply Scholarship</NavLink></li>
                 <li><NavLink to='/dashboard/allreview'>Manage Reviews</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>
                <li><NavLink to='/dashboard/application'>My Application</NavLink></li>
                <li><NavLink to='/dashboard/review'>My Reviews</NavLink></li>
              </>
            )}
          </ul>
        </div>
        <div className='flex-1 p-6'>
          <Outlet />

         
        </div>

        
      </div>  
      <Footer />
    </>
  );
}

export default Dashboard;

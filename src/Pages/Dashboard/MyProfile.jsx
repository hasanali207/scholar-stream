
import useAuth from '../../Hooks/useAuth';
const MyProfile = () => {
  const { user } = useAuth();

  return (
    <>
    <div className='flex justify-center py-6'>
      <h1 className='text-3xl'>User Information</h1>
    </div>
    <div className='flex justify-center items-center mt-8'>
      
      <div className="card w-96 bg-base-100 shadow-xl text-center border">
        <div className="avatar justify-center flex my-3">
          <div className="w-24 rounded-full">
            <img src={user?.photoURL} />
          </div>
        </div>
        <div className="card-body flex justify-center items-center">
          <h2 className="card-title ">
            {user?.displayName}
           
          </h2>
          <p className='' >{user?.email}</p>
         
        </div>
      </div>
    </div>
    </>
  );
};

export default MyProfile;

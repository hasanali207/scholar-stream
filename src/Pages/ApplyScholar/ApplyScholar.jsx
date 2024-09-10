import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxioxSecure';
import useScholarItems from '../../Hooks/useScholarItems';
import useAxiosPublic from '../../Hooks/useAxiosPublic';


function ApplyScholar() {
  const { user } = useAuth();
  const [scholarItems, refetch] = useScholarItems();
  const { id: itemId } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const [isLoading, setIsLoading] = useState(true);

  const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure(`/singleItem/${itemId}`);
        const data = res.data;
        console.log(data)
        setValue('user_email', user?.email || '');
        setValue('user_name', user?.displayName || '');
        setValue('university_name', data.university_name || '');
        setValue('scholarshipCategory', data.scholarshipCategory || '');
        setValue('subjectCategory', data.subjectCategory || '');
        setValue('applicationFees', data.applicationFees || '');
        setValue('scholarshipName', data.scholarshipName || '');
        setValue('serviceCharge', data.serviceCharge || '');
        setValue('university_address', data.universityCountry + ' ' + data.universityCity || '');
        
        setIsLoading(false);  
      } catch (error) {
        console.error('Error fetching item:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [itemId, user, axiosSecure, setValue]);


  const onSubmit = async (data) => {
    const cureentDate = new Date().toLocaleDateString()
     // image upload to imgbb and then get an url
     
     const imageFile = { image: data.applicantImage[0] }
     const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API}`, imageFile, {
         headers: {
             'content-type': 'multipart/form-data'
         }
     });

   
    
     if(res.data.success){
     const applicationFees = data.applicationFees
     const serviceCharge = data.serviceCharge
     const scholarshipName = data.scholarshipName
      const applicantImage = res.data.data.display_url
      const status = 'pending' 
      const dataWithId = { ...data, itemId, cureentDate, applicantImage, applicationFees, serviceCharge, scholarshipName, status  };
        await axiosSecure.post(`/scholarfromuser`, dataWithId);
        Swal.fire({
          title: "Applied Successfully",
          text: "Applied Success & record this!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Okay!"
        });
        refetch();
      } 
  
  };


 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className='py-12 flex items-center justify-center'>
        <h2 className='text-3xl font-bold'>Provide Information</h2>
        <p>{scholarItems.length}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          <div>
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" {...register("phone", { required: true })} />
            {errors.phone && <span>This field is required</span>}
          </div>
          <div className='form-control w-full'>
            <label>Applicant Image/Logo</label>
            <input type="file"  {...register("applicantImage", { required: true })} className="" />
            {errors.applicantImage && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" {...register("address", { required: true })} />
            {errors.address && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="applicantName">Name</label>
            <input type="text" id="applicantName" {...register("applicantName", { required: true })} />
            {errors.applicantName && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="ssc">SSC Result</label>
            <input type="text" id="ssc" {...register("ssc", { required: true })} />
            {errors.ssc && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="hsc">HSC Result</label>
            <input type="text" id="hsc" {...register("hsc", { required: true })} />
            {errors.hsc && <span>This field is required</span>}
          </div>
                    <div>
            <label htmlFor="gender">Gender</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <select id="gender" {...field}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              )}
            />
          </div>
          <div>
            <label htmlFor="degree">Degree</label>
            <Controller
              name="degree"
              control={control}
              render={({ field }) => (
                <select id="degree" {...field}>
                  <option value="">Select Degree</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              )}
            />
          </div>
          <div>
            <label htmlFor="scholarshipName">ScholarShip Name</label>
            <input type="text" id="university_name" {...register("scholarshipName", { required: true })} disabled />
            {errors.university_name && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="university_name">University Name</label>
            <input type="text" id="university_name" {...register("university_name", { required: true })} disabled />
            {errors.university_name && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="University Address">University Address</label>
            <input type="text" id="address" {...register("university_address", { required: true })} disabled />
            {errors.address && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="scholarshipCategory">Scholarship Category</label>
            <input type="text" id="scholarshipCategory" {...register("scholarshipCategory", { required: true })} disabled />
            {errors.scholarshipCategory && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="subjectCategory">Subject Category</label>
            <input type="text" id="subjectCategory" {...register("subjectCategory", { required: true })} disabled />
            {errors.subjectCategory && <span>This field is required</span>}
          </div>
          <div>
            <label htmlFor="user_email">User Email</label>
            <input type="text" id='user_email' {...register("user_email")} disabled />
          </div>
          <div>
            <label htmlFor="user_name">User Name</label>
            <input type="text" id='user_name' {...register("user_name")} disabled />
          </div>
        </div>
      
        <div>
          <button className='btn btn-outline w-40 mt-4' type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default ApplyScholar;

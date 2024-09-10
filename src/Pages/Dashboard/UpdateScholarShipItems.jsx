import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxioxSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const UpdateScholarShipItems = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    axiosSecure(`/items/update/${id}`)
      .then((res) => {
        const data = res.data;
       
        
        setValue('scholarshipName', data.scholarshipName || '');
        setValue('university_name', data.university_name || '');
        setValue('university_image', data.university_image || '');
        setValue('universityCountry', data.universityCountry || '');
        setValue('universityCity', data.universityCity || '');
        setValue('universityWorldRank', data.universityWorldRank || '');
        setValue('subjectCategory', data.subjectCategory || '');
        setValue('scholarshipCategory', data.scholarshipCategory || '');
        setValue('degree', data.degree || '');
        setValue('tuitionFees', data.tuitionFees || '');
        setValue('applicationFees', data.applicationFees || '');
        setValue('serviceCharge', data.serviceCharge || '');
        setValue('applicationDeadline', data.applicationDeadline || '');
        setValue('scholarshipPostDate', data.scholarshipPostDate || '');
        setValue('postedUserEmail', user?.email || '');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id, user?.email, setValue, axiosSecure]);

  const onSubmit = async (data) => {
    
      const imageFile = { image: data.university_image[0] }
      const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API}`, imageFile, {
          headers: {
              'content-type': 'multipart/form-data'
         
          }}
        )
  
 
  
 

   if(res.data.success){
    const university_image = res.data.data.display_url 
    const updatedData = { ...data, university_image };
    axiosSecure.put(`/updateItem/${id}`, updatedData)
    .then(() => {
      Swal.fire({
        title: "Updated Successfully",
        text: "Scholarship Data Updated & record this!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay!"
      });
    })
    
   }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='form-control w-full'>
          <label>Scholarship Name</label>
          <input {...register('scholarshipName', { required: true })} className="input input-bordered w-full" />
          {errors.scholarshipName && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>University Name</label>
          <input {...register('university_name', { required: true })} className="input input-bordered w-full" />
          {errors.university_name && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>University Image/Logo</label>
          <input type="file" {...register('university_image', { required: true })} className="input input-bordered w-full" />
          {errors.university_image && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>University Country</label>
          <input {...register('universityCountry', { required: true })} className="input input-bordered w-full" />
          {errors.universityCountry && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>University City</label>
          <input {...register('universityCity', { required: true })} className="input input-bordered w-full" />
          {errors.universityCity && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>University World Rank</label>
          <input type="number" {...register('universityWorldRank', { required: true })} className="input input-bordered w-full" />
          {errors.universityWorldRank && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>Subject Category</label>
          <select {...register('subjectCategory', { required: true })} className="select select-bordered w-full">
            <option disabled selected>Select A Category</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>
          {errors.subjectCategory && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>Scholarship Category</label>
          <select {...register('scholarshipCategory', { required: true })} className="select select-bordered w-full">
            <option disabled selected>Select A Category</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
          {errors.scholarshipCategory && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>Degree</label>
          <select {...register('degree', { required: true })} className="select select-bordered w-full">
            <option disabled selected>Select A Category</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
          {errors.degree && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>Tuition Fees (Optional)</label>
          <input type="number" {...register('tuitionFees')} className="input input-bordered w-full" />
        </div>

        <div className='form-control w-full'>
          <label>Application Fees</label>
          <input type="number" {...register('applicationFees', { required: true })} className="input input-bordered w-full" />
          {errors.applicationFees && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>Service Charge</label>
          <input type="number" {...register('serviceCharge', { required: true })} className="input input-bordered w-full" />
          {errors.serviceCharge && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>Application Deadline</label>
          <input type="date" {...register('applicationDeadline', { required: true })} className="input input-bordered w-full" />
          {errors.applicationDeadline && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>Scholarship Post Date</label>
          <input type="date" {...register('scholarshipPostDate', { required: true })} className="input input-bordered w-full" />
          {errors.scholarshipPostDate && <span>This field is required</span>}
        </div>

        <div className='form-control w-full'>
          <label>Posted User Email</label>
          <input type="email" {...register('postedUserEmail', { required: true })} className="input input-bordered w-full" disabled />
          {errors.postedUserEmail && <span>This field is required</span>}
        </div>

        <button className="btn btn-outline" type="submit">Update Scholarship</button>
      </div>
    </form>
  );
};

export default UpdateScholarShipItems;

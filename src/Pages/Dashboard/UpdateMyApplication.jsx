import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxioxSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdateMyApplication = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure(`/scholaritem/update/${id}`);
        const data = res.data;
        setValue('user_email', user?.email || '');
        setValue('user_name', user?.displayName || '');
        setValue('phone', data.phone || '');
        setValue('address', data.address || '');
        setValue('applicantName', data.applicantName || '');
        setValue('ssc', data.ssc || '');
        setValue('hsc', data.hsc || '');
        setValue('gender', data.gender || '');
        setValue('degree', data.degree || '');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, user?.email, user?.displayName, setValue, axiosSecure]);

  const onSubmit = async (data) => {
    const imageFile = { image: data.applicantImage[0] };
    try {
      const res = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API}`, imageFile, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        const applicantImage = res.data.data.display_url;
        const updatedData = { ...data, applicantImage };
        

        const updateRes = await axiosSecure.patch(`scholaritem/updateItem/${id}`, updatedData);
        console.log('Update Response:', updateRes.data);

        // await axiosSecure.patch(`scholaritem/updateItem/${id}`, updatedData);
        Swal.fire({
          title: "Updated Successfully",
          text: "Scholarship Data Updated & record this!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Okay!"
        });
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          <div>
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" {...register("phone", { required: true })} />
            {errors.phone && <span>This field is required</span>}
          </div>
          <div className='form-control w-full'>
            <label>Applicant Image/Logo</label>
            <input type="file" {...register("applicantImage", { required: true })} className="" />
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
            <label htmlFor="user_email">User Email</label>
            <input type="text" id='user_email' {...register("user_email")} disabled />
          </div>
          <div>
            <label htmlFor="user_name">User Name</label>
            <input type="text" id='user_name' {...register("user_name")} disabled />
          </div>
        </div>
        <div>
          <button className='btn btn-outline w-40 mt-4' type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateMyApplication;

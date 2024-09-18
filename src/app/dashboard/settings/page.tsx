'use client'
import { useEffect } from 'react';
import Image from 'next/image'
import { FaRegCircleUser } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSession } from "next-auth/react";
import { MdContactEmergency,MdContactMail } from 'react-icons/md';

interface User {
    name?: string;
    email?: string;
    profilePhoto?: string;
    _id?: string;
  }

  interface Session {
    expires: string;
    user?: User;
  }

export default function SettingsPage() {
    const { data: session, status } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    const router = useRouter();
    const photoUrl = 'https://api.nevtis.com/marketplace/files/list/'
    // Set initial form values
    useEffect(() => {
        setValue('name', session?.user?.name);
        setValue('email', session?.user?.email);
    }, [session, setValue]);

    const onSubmit = async (formData:any) => {
        const dataF = new FormData();
        dataF.append('file', formData.image[0]);
        try{
        const response = await axios.post('https://api.nevtis.com/marketplace/files/create', dataF, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data.key)
        const dataToUpdate = {
            ...formData,
            _id: session!.user!._id,
            profilePhoto: `${response.data.key}`
            /* profilePhoto: `https://api.nevtis.com/marketplace/files/${response.data.key}` */
        }
        const updatedUser = await axios.put(`https://api.nevtis.com/user/users/seller/update`,dataToUpdate);
        Swal.fire({
            icon: 'success',
            title: 'User Updated Successfully',
            showConfirmButton: false,
            timer: 1500
        });
        router.push('/dashboard/main');
        console.log(updatedUser);
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: 'Please try again later'
        });
        }
    

      };
    //console.log("data",session)
  return (
    <div className="flex flex-col justify-center items-center px-4 py-16">
      <h1 className='text-2xl text-orange-900 font-semibold'>Settings Page</h1>
      <div className='flex flex-col justify-evenly gap-4 border border-slate-200 shadow-2xl rounded-lg p-4 mt-2'>
        <div className='text-orange-800 flex  justify-center items-center'>
            {session?.user?.profilePhoto ? (
            <Image src={`${photoUrl}${session.user.profilePhoto}`} alt="User Image" width={70} height={70} />
            ) : (
            <FaRegCircleUser size={70} />
            )}
        </div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='shadow-xl p-2 bg-slate-100 border border-slate-200 rounded-md'>
                    <label htmlFor="image" className='text-orange-800 me-1 font-semibold'>Avatar</label>
                    <input type="file" {...register('image')} placeholder="Avatar"/>
                </div>
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                        />
                            <MdContactEmergency className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="Email"
                            {...register("email")}
                        />
                            <MdContactMail className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <button type="submit" className=' bg-orange-600 text-white font-semibold rounded-md py-1 mt-1 shadow-lg w-full'>Submit</button>
            </form>
        </div>
      </div>
    </div>
  );
}
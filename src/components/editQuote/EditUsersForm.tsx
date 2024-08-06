'use client'
import React from 'react'
import { useTotalUsers, useTotalFax, useTotalConference } from "@/store/UserAccounts";
import { IoPerson } from "react-icons/io5";
import { FaFax, FaUsersLine, FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { MdContactEmergency, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"


type Inputs = {
    totalUsers: number;
    totalFax: number;
    totalConference: number;
    };


const EditUsersForm = ({quote}:any) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>({
        defaultValues: {
            totalUsers: quote.totalUsers,
            totalFax: quote.totalFax,
            totalConference: quote.totalConference
        }
      });

    const { totalUsers, addUser, removeUser, setTotalUsers } = useTotalUsers();
    const { totalFax, addFax, removeFax, setTotalFax } = useTotalFax();
    const { totalConference, addConference, removeConference, setTotalConference } = useTotalConference();
/*     const handleAddUser = () => { addUser() }
    const handleSubstractUser = () => { removeUser() }
    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {setTotalUsers(Number(event.target.value))};
    const handleAddFax = () => { addFax() }
    const handleSubstractFax = () => { removeFax() }
    const handleFaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {setTotalFax(Number(event.target.value))};
    const handleAddConference = () => { addConference() }
    const handleSubstractConference = () => { removeConference() }
    const handleConferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {setTotalConference(Number(event.target.value))};
    //console.log(totalUsers, totalFax, totalConference) */
    const router = useRouter();
  
    const handleBack = () => {
      router.push(`/dashboard/editQuote/company/${quote._id}`)
    }
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const companySend = {
            totalUsers: data.totalUsers,
            totalFax: data.totalFax,
            totalConference: data.totalConference,
        }
        //console.log(companySend)
        setTotalUsers(Number(data.totalUsers))
        setTotalFax(Number(data.totalFax))
        setTotalConference(Number(data.totalConference))
        router.push(`/dashboard/editQuote/portNumbers/${quote._id}`)
    }
    //console.log(totalUsers,totalFax,totalConference)
    //console.log(quote.totalUsers,quote.totalFax,quote.totalConference)
  return (
    <div className='p-2 mt-4'>
      <div className="px-2 md:px-6">
        <h2 className="text-xl text-center md:text-2xl text-orange-800 font-semibold">Edit the User accounts you will need</h2>
        <p className="text-justify mb-2">You may choose up to 50 user accounts</p>
      </div>
      <div className="p-1 md:p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-1 w-full relative rounded-2xl shadow-xl">
                <div className='flex justify-center gap-4'>
                    <IoPerson size={25} className="text-orange-500 block md:hidden"/>
                    <h2 className='text-orange-800 font-bold text-lg'>Users</h2>
                </div>
                <input
                    className="w-full p-2 bg-primary border border-input rounded-2xl text-center"
                    type="text"
                    placeholder="Users"
                    {...register("totalUsers", { required: true })}
                />
            </div>
            <div className="my-1 w-full relative rounded-2xl shadow-xl">
                <div className='flex justify-center gap-4'>
                    <FaFax size={25} className="text-orange-500 block md:hidden"/>
                    <h2 className='text-orange-800 font-bold text-lg'>Fax</h2>
                </div>
                <input
                    className="w-full p-2 bg-primary border border-input rounded-2xl text-center"
                    type="text"
                    placeholder="Fax"
                    {...register("totalFax", { required: true })}
                />
            </div>
            <div className="my-1 w-full relative rounded-2xl shadow-xl">
                <div className='flex justify-center gap-4'>
                    <FaUsersLine size={30} className="text-orange-500 block md:hidden"/>
                    <h2 className='text-orange-800 font-bold text-lg'>Conference</h2>
                </div>
                <input
                    className="w-full p-2 bg-primary border border-input rounded-2xl text-center"
                    type="text"
                    placeholder="Fax"
                    {...register("totalConference", { required: true })}
                />
            </div>
            <div className='flex justify-between pt-2'>
                <button type="button" className="bg-orange-400 p-1 rounded-md flex ms-2  me-4 mb-1">
                    <span className="text-lg text-gray-100 font-semibold">Back </span> <MdSkipPrevious className="text-gray-100" size={28}/>
                </button>
                <button className="bg-orange-400 p-1 rounded-md flex ms-auto me-4 mb-1">
                    <span className="text-lg text-gray-100 font-semibold">Next </span> <MdSkipNext className="text-gray-100" size={28}/>
                </button>
            </div>
        </form>

      </div>
    </div>
  )
}

export default EditUsersForm
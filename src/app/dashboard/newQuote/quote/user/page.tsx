'use client'
import { useTotalUsers, useTotalFax, useTotalConference } from "@/store/UserAccounts";
import { IoPerson } from "react-icons/io5";
import { FaFax, FaUsersLine, FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { MdSkipNext } from "react-icons/md";
import { useRouter } from "next/navigation";


interface State {
  totalUsers: number; 
  // Add other state properties here
}

export default function UserPage() {
  
  const { totalUsers, addUser, removeUser, setTotalUsers } = useTotalUsers();
  const { totalFax, addFax, removeFax, setTotalFax } = useTotalFax();
  const { totalConference, addConference, removeConference, setTotalConference } = useTotalConference();
  const handleAddUser = () => { addUser() }
  const handleSubstractUser = () => { removeUser() }
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {setTotalUsers(Number(event.target.value))};
  const handleAddFax = () => { addFax() }
  const handleSubstractFax = () => { removeFax() }
  const handleFaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {setTotalFax(Number(event.target.value))};
  const handleAddConference = () => { addConference() }
  const handleSubstractConference = () => { removeConference() }
  const handleConferenceChange = (event: React.ChangeEvent<HTMLInputElement>) => {setTotalConference(Number(event.target.value))};
  //console.log(totalUsers, totalFax, totalConference)
  const router = useRouter();

  const handleNext = () => {
    router.push('/dashboard/newQuote/quote/numberPorts')
  }


  return (
    <div>
      <div className="px-2 md:px-6">
        <h2 className="text-xl text-center md:text-2xl text-orange-900">Tell us how many User accounts you will need</h2>
        <p className="text-justify mb-2">Fill out the fields below to determine how many user accounts you need. You may choose up to 50 user accounts</p>
      </div>
      <div className="p-1 md:p-8 rounded-lg shadow-lg">

        <div className="flex flex-col md:flex-row md:justify-between items-baseline mt-2 border-b border-orange-950 mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <IoPerson size={25} className="text-orange-500 block md:hidden"/>
            <IoPerson size={35} className="text-orange-500 hidden md:block"/>
            <div>How many employees?</div>
          </div>
          <div className="flex justify-center md:justify-end items-baseline text-lg gap-1">
            <button onClick={handleSubstractUser}><FaCircleMinus className="text-orange-500"/></button>
            <input type="number" value={totalUsers} onChange={handleUserChange} className="text-center mx-1"/>
            <button onClick={handleAddUser}><FaCirclePlus className="text-gray-500"/></button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-baseline mt-2 border-b border-orange-950 mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <FaFax size={25} className="text-orange-500 block md:hidden"/>
            <FaFax size={35} className="text-orange-500 hidden md:block"/>
            <div>How many fax accounts?</div>
          </div>
          <div className="flex justify-center md:justify-end items-baseline text-lg gap-1">
            <button onClick={handleSubstractFax}><FaCircleMinus className="text-orange-500"/></button>
            <input type="number" value={totalFax} onChange={handleFaxChange} className="text-center mx-1"/>
            <button onClick={handleAddFax}><FaCirclePlus className="text-gray-500"/></button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between items-baseline mt-2 border-b border-orange-950 mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <FaUsersLine size={25} className="text-orange-500 block md:hidden"/>
            <FaUsersLine size={35} className="text-orange-500 hidden md:block"/>
            <div>How many conference rooms?</div>
          </div>
          <div className="flex justify-center md:justify-end items-baseline text-lg gap-1">
            <button onClick={handleSubstractConference}><FaCircleMinus className="text-orange-500"/></button>
            <input type="number" value={totalConference} onChange={handleConferenceChange} className="text-center mx-1"/>
            <button onClick={handleAddConference}><FaCirclePlus className="text-gray-500"/></button>
          </div>
        </div>
        <button className="bg-orange-500 p-1 rounded-md flex ms-auto me-4 mb-1" onClick={handleNext}>
          <span className="text-lg text-gray-200">Next </span> <MdSkipNext className="text-gray-200" size={28}/>
        </button>
      </div>
    </div>
  );
}
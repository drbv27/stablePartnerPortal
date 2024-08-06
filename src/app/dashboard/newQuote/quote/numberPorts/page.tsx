'use client'
import React, { useState } from "react";
import { useTotalUsers, useTotalFax, useTotalConference } from "@/store/UserAccounts";
import { IoPerson, IoKeypadOutline } from "react-icons/io5";
import { FaFax, FaUsersLine, FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { MdSkipNext } from "react-icons/md";
import { useRouter } from "next/navigation";
import { usePortNumbers } from "@/store/PortNumbersStore";


interface State {
  totalUsers: number; 
  // Add other state properties here
}

export default function NumberPortsPage() {
  
  const [totalPorts, setTotalPorts] = useState(0);
  const [portValues, setPortValues] = useState<number[]>([]); // [ {port1: 1234}, {port2: 1234}, {port3: 1234} ]
  const {portNumbers, setPortNumbers} = usePortNumbers();
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

  const generateInputs = () => {
    let inputs = [];
    for (let i = 0; i < totalPorts; i++) {
      inputs.push(
        <div key={i}>
          <label>PORT{i+1}:</label>
          <input type="number"  className="port-input ms-1 my-1 shadow-md"/>
        </div>
      );
    }
    return inputs;
  }

  const handleButtonClick = () => {
    const inputs = document.querySelectorAll('.port-input');
    let values: number[] = [];
    inputs.forEach((input:any) => {
      values.push(Number(input.value));
    });
    setPortValues(values);
    setPortNumbers(values.map(String)); // convert numbers to strings
  }

  const handleNext = () => {
    const inputs = document.querySelectorAll('.port-input');
    let values: number[] = [];
    inputs.forEach((input:any) => {
      values.push(Number(input.value));
    });
    setPortValues(values);
    setPortNumbers(values.map(String)); // convert numbers to strings
    router.push('/dashboard/newQuote/quote/market')
  }

console.log(portValues)
console.log(portNumbers)
  return (
    <div>
      <div className="px-2 md:px-6">
        <h2 className="text-xl text-center md:text-2xl text-orange-900">Tell us how many Phone number you want.</h2>
        <p className="text-justify mb-2">Choose the quantity and after please give us the numbers. Remeber the first two are for free, after is U$ 2 /each </p>
      </div>
      <div className="p-1 md:p-8 rounded-lg shadow-lg">

        <div className="flex flex-col md:flex-row md:justify-between items-baseline mt-2 border-b border-orange-950 mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <IoKeypadOutline size={25} className="text-orange-500 block md:hidden"/>
            <IoKeypadOutline size={35} className="text-orange-500 hidden md:block"/>
            <div>How many Number ports?</div>
          </div>
          <div className="flex justify-center md:justify-end items-baseline text-lg gap-1">
            <button onClick={e=>setTotalPorts(totalPorts-1)}><FaCircleMinus className="text-orange-500"/></button>
            <input type="number" value={totalPorts} onChange={handleUserChange} className="text-center mx-1"/>
            <button onClick={e=>setTotalPorts(totalPorts+1)}><FaCirclePlus className="text-gray-500"/></button>
          </div>
        </div>
        {generateInputs()}
        {/* {totalPorts && totalPorts > 0 && <button className="bg-orange-500 p-1 rounded-md flex ms-auto me-4 mb-1" onClick={handleButtonClick}>save</button>} */}




        <button className="bg-orange-500 p-1 rounded-md flex ms-auto me-4 mb-1" onClick={handleNext}>
          <span className="text-lg text-gray-200">Next </span> <MdSkipNext className="text-gray-200" size={28}/>
        </button>
      </div>
    </div>
  );
}
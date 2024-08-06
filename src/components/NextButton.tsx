'use client'
import React from 'react'
import { MdSkipNext } from "react-icons/md";
import { useRouter } from "next/navigation";

interface NextButtonProps {
    route: string;
  }

const NextButton : React.FC<NextButtonProps> = ({ route }) => {
    const router = useRouter();

    const handleNext = () => {
      router.push(route)
    }
  return (
    <button className="bg-orange-500 p-1 rounded-md flex ms-auto me-4 mb-1" onClick={handleNext}>
        <span className="text-lg text-gray-200">Next </span> <MdSkipNext className="text-gray-200" size={28}/>
    </button>
  )
}

export default NextButton
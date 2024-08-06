'use client'
import {useState} from "react";
import { FaSpinner } from "react-icons/fa6"
export default function LoadingPage() {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      {loading && <FaSpinner className="animate-spin text-5xl text-orange-500"/>}
    </div>
  );
}
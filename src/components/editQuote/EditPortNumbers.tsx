'use client'
import React, { useState, useEffect } from 'react'
import { MdSkipNext } from 'react-icons/md'
import { useRouter } from "next/navigation";
import { usePortNumbers } from "@/store/PortNumbersStore";
import { FaPlusCircle } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';

const EditPortNumbers = ({quote, id}: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [portValues, setPortValues] = useState<string[]>([]);
    const { setPortNumbers } = usePortNumbers();
    const [newPortNumber, setNewPortNumber] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        if (quote && quote.quote && quote.quote.portNumbers) {
            setPortValues(quote.quote.portNumbers);
        }
        setIsLoading(false);
    }, [quote]);

    const handleAddPort = () => {
        if (newPortNumber) {
            setPortValues(prevValues => [...prevValues, newPortNumber]);
            setNewPortNumber('');
        }
    };

    const handleRemovePort = (index: number) => {
        setPortValues(prevValues => prevValues.filter((_, i) => i !== index));
    };

    const handlePortChange = (index: number, value: string) => {
        setPortValues(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            return newValues;
        });
    };

    const handleNext = () => {
        setPortNumbers(portValues);
        router.push(`/dashboard/editQuote/market/${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="px-2 md:px-6">
                <h2 className="text-xl text-center md:text-2xl text-orange-900">Edit your Phone numbers</h2>
                <p className="text-justify mb-1">You can edit, remove or add new phone numbers. Remember the first two are free, after that it&apos;s $2 each.</p>
            </div>
            <div className="p-1 md:p-8 rounded-lg shadow-lg">
                <div className="mt-2 mb-4 text-center flex justify-center items-center">
                    <label>Add new port # :</label>
                    <input
                        type="text"
                        value={newPortNumber}
                        onChange={(e) => setNewPortNumber(e.target.value)}
                        className="port-input ms-1 my-1 shadow-md px-2 py-1 rounded"
                    />
                    <button
                        className='px-2 py-1 bg-orange-400 text-white rounded-md ms-2 text-2xl font-semibold'
                        onClick={handleAddPort}
                    >
                        <FaPlusCircle />
                    </button>
                </div>
                {portValues.length === 0 ? (
                    <div className="text-center py-4 px-2 bg-gray-100 rounded-md mb-4">
                        <p className="text-lg font-semibold text-gray-600">No ports selected</p>
                        <p className="text-sm text-gray-500">Add your first port number using the form above</p>
                    </div>
                ) : (
                    portValues.map((port, index) => (
                        <div key={index} className="mb-2 border p-2 shadow-md bg-gray-100 rounded-md flex items-center">
                            <label>PORT {index + 1}:</label>
                            <input
                                type="text"
                                value={port}
                                onChange={(e) => handlePortChange(index, e.target.value)}
                                className="port-input ms-1 my-1 shadow-md px-2 py-1 rounded"
                            />
                            <button
                                className='px-2 py-1 bg-red-500 text-white text-2xl rounded-md ms-2'
                                onClick={() => handleRemovePort(index)}
                            >
                                <FaCircleXmark />
                            </button>
                        </div>
                    ))
                )}
                <button 
                    className="bg-orange-400 p-2 rounded-md flex ms-auto me-4 mb-1 items-center"
                    onClick={handleNext}
                >
                    <span className="text-lg text-gray-100 font-semibold mr-2">Next</span>
                    <MdSkipNext className="text-gray-100" size={28}/>
                </button>
            </div>
        </div>
    )
}

export default EditPortNumbers
'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';



const ContractInfo = ({company,dataAll}:any) => {
    const [sellers, setSellers] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios.get('https://api.nevtis.com/user/users/seller/all')
        .then(response => {
          setSellers(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('There was an error!', error);
          setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
      }

      const seller = sellers ? (sellers as any).filter((seller:any) => seller._id === dataAll.user) : [];
      console.log(seller)
    //console.log(dataAll)
  return (
    <div className="w-full border border-gray-300 mt-4 p-2 md:p-4 rounded-md">
        <div className="w-full flex flex-col md:flex-row justify-between px-1 md:px-6 py-1">
            <div className="w-full md:w-[50%]">
                <p className="font-light inline-block md:block">Account Manager: </p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">{seller.length !== 0 ? seller[0].name : "Matt Salas"}</p>
            </div>
            <div className="w-[50%]">
                <p className="font-light inline-block md:block">REP ID</p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">AS 05</p>
            </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between px-1 md:px-6 py-1">
            <div className="w-full md:w-[33%]">
                <p className="font-light inline-block md:block">Customer Information</p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">{company.companyName}</p>
            </div>
            <div className="w-full md:w-[33%]">
                <p className="font-light inline-block md:block">Federal TAX ID</p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">N/A</p>
            </div>
            <div className="w-full md:w-[33%]">
                <p className="font-light inline-block md:block">Phone #</p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">{company.phone}</p>
            </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between px-1 md:px-6 py-1">
            <div className="w-full md:w-[50%]">
                <p className="font-light inline-block md:block">Authorized Contact</p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">{`${company.name} ${company.lastname}`}</p>
            </div>
            <div className="w-full md:w-[50%]">
                <p className="font-light inline-block md:block">Email</p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">{company.email}</p>
            </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between px-1 md:px-6 py-1">
            <div className="w-full md:w-[80%]">
                <p className="font-light inline-block md:block">Service Address <span className="text-xs md:text-sm block md:inline-block">(This address will be sued for E911 Services)</span></p>
                <p className="font-semibold md:pl-0">{`${company.address} ${company.address2}, ${company.city}, ${company.state}, ${company.zip}`}</p>
            </div>
            <div className="mt-2 md:mt-0 w-full md:w-[20%]">
                <p className="font-light inline-block md:block">Site Name</p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">{company.siteAnalysis}</p>
            </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between px-1 md:px-6 py-1">
            <div className="w-full md:w-[50%]">
                <p className="font-light inline-block md:block">Location Type</p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">{company.locationType}</p>
            </div>
            <div className="w-full md:w-[50%]">
                <p className="font-light inline-block md:block">Bandwith</p>
                <p className="font-semibold inline-block pl-2 md:block md:pl-0">{company.bandwith}</p>
            </div>
        </div>
    </div>
  )
}

export default ContractInfo
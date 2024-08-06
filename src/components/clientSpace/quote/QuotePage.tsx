'use client'
import React from 'react'
import axios from 'axios';
import QuoteHeader from './QuoteHeader'
import QuoteInfo from './QuoteInfo';
import MonthlyValues from './MonthlyValues';
import OneTimeValues from './OneTimeValues';
import SpecialTerms from './SpecialTerms';
import OurObjetive from './OurObjetive';
import ProposalAgreements from './ProposalAgreements';
import { PDFViewer,pdf, PDFDownloadLink } from "@react-pdf/renderer";
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import ReactPdfc from './ReactPdfc';
import { updateStatus } from '@/actions/clientSpace/clientspace-actions';
import { useRouter } from 'next/navigation';
import { updateQuote } from '@/actions/quotes/quotes-actions';


const QuotePage = ({data,id}:any) => {
    const router = useRouter();
    //console.log(data);
    if (!data) {
        return <div>Loading...</div>;
    }
    
    if (data.status !== 'new') {
    return (
        <div className='mx-[10vw] md:mx-[25vw] mt-[10vh] md:mt-[20vh] bg-slate-200 rounded-md shadow-2xl p-4'>
        <h2 className='text-2xl text-center text-orange-500 font-semibold'>Not Authorized</h2>
        <div className='flex justify-center'>
            <img src="/logo2.png" alt="logo" width="200px" height="30px"/>
        </div>
        <p className='text-lg text-center'>- -Change page- -</p>
        <p className='text-center text-orange-500 font-semibold'>This quote has already signed.</p>
        <p className='text-center'>If you need more information: email to: <a href="mailto:juan.o@nevtis.com" className='text-orange-500'>juan.o@nevtis.com</a>  - to confirm, and complete - include full credit card or bank info.. Once Juan Olmedo signes and completes - email contract to: sales rep, customer, and installations@nevtis.com, for credit card and bank info - only display last 4 digits</p>
        <p className='text-center'>Or go to:</p>
        <p className='text-center'><a href="https://nevtis.com/" className='text-orange-500'>www.nevtis.com</a></p>
        </div>
        );
    }

    const handleAccept = async () => {
        const updatedQuote = await updateStatus(id,'accept');
        router.push(`/client/accept/${id}`);
        //console.log(updatedQuote)
    }
    const handleReject = async () => {
        const updatedQuote = await updateStatus(id,'reject');
        router.push(`/client/reject/${id}`);
        //console.log(updatedQuote)
    }
    const handlesaveFile = async (blob:any) => {
        const formData = new FormData();
        formData.append('file', blob,'quote.pdf');
        try {
            const response = await axios.post('https://api.nevtis.com/marketplace/files/create', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            const updateQuoteR = await updateQuote(
                id,
                {   pdf:`https://api.nevtis.com/marketplace/files${response.data.key}`, 
                    status:'accept'
                });
            router.push(`/client/accept/${id}`);
            //console.log(response.data);
          } catch (error) {
            console.error(error);
          }
    }

    const handleSave2 = async () => {
        const blob = await pdf(<ReactPdfc company={data.company} totalProducts={data.totalProducts} totalEntrieProducts={data.totalEntrieProducts} totalUsers={data.totalUsers} totalFax={data.totalFax} totalConference={data.totalConference} portNumbers={data.portNumbers} specialTerms={data.specialTerms} />).toBlob();
    
        const formData = new FormData();
        formData.append('file', blob,'quote.pdf');
        try {
            const response = await axios.post('https://api.nevtis.com/marketplace/files/create', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            const updateQuoteR = await updateQuote(
                id,
                {   pdf:`https://api.nevtis.com/marketplace/files/${response.data.key}`, 
                    status:'accept'
                });
            router.push(`/client/accept/${id}`);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
    }
//console.log(data)
  return (
    <div className='w-[97vw] flex flex-col-reverse md:flex-row m-2 md:m-4'>
        <div className='w-full md:w-[80%] md:mx-8 h-[75vh] md:h-[95vh] overflow-y-auto'>
            <QuoteHeader companyName={data.company.companyName} quoteNo={data.quoteNo}/>
            <hr />
            <QuoteInfo data={data}/>
            <hr />
            <h2 className='text-3xl text-center font-semibold mt-2 text-gray-500'>Proposed Services</h2>
            <MonthlyValues data={data}/>
            <OneTimeValues data={data}/>
            <hr className='my-2'/>
            <SpecialTerms specialTerms={data.specialTerms}/>
            <hr className='my-2'/>
            <OurObjetive/>
            <hr className='my-2'/>
            <ProposalAgreements/>
        </div>
        <div className='w-[90%] md:w-[20%] my-2'>
            <div className='flex flex-col gap-1 md:mx-4 mb-1'>
                <button 
                    onClick={handleSave2}
                    className='mb-2 bg-green-400 text-white text-lg font-semibold rounded py-2'
                >
                    Accept <FaCircleCheck className='inline'size={25}/>
                </button>
                <button 
                    onClick={handleReject}
                    className='bg-red-400 text-white text-lg font-semibold rounded py-2'
                >
                    Reject <FaCircleXmark className='inline' size={25}/>
                </button>
            </div>
            <div className='md:mt-4 border border-gray-200 py-2 md:py-4 rounded-md shadow-md'>
                <h3 className='text-center text-sm mt-2 font-semibold'>Pdf file for Print? </h3>
                <div className='p-2 shadow-lg bg-gray-50 border-gray-100 rounded-md hidden md:block'>
                    <PDFViewer style={{ width: "100%", height: "30vh", padding:"1vw" }}>
                        <ReactPdfc
                        company={data.company} 
                        totalProducts={data.totalProducts}
                        totalEntrieProducts={data.totalEntrieProducts}
                        totalUsers={data.totalUsers}
                        totalFax={data.totalFax}
                        totalConference={data.totalConference}
                        portNumbers={data.portNumbers}
                        specialTerms={data.specialTerms}
                        />
                    </PDFViewer>
                </div>
                <div  className='mt-2 md:mt-4 text-center'>
                    <PDFDownloadLink
                        document={<ReactPdfc company={data.company} totalProducts={data.totalProducts} totalEntrieProducts={data.totalEntrieProducts} totalUsers={data.totalUsers} totalFax={data.totalFax} totalConference={data.totalConference} portNumbers={data.portNumbers} specialTerms={data.specialTerms} />}
                        fileName="quote.pdf"
                        style={{
                            textDecoration: "none",
                            padding: "0px",
                            backgroundColor: "#fdba74",
                            border: "1px solid white",
                            borderRadius: "5px",
                            marginTop: "50px",
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : "Download Pdf"
                        }
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuotePage
'use client'
import Image from 'next/image'
import Link from 'next/link'


const QuoteHeader = ({companyName,quoteNo}:any) => {
  return (
    <div className="w-[100%]">
        <div className=""><span>NEVTIS CORP |</span> <span><Link href="https://nevtis.com" className="text-orange-500">https://nevtis.com</Link></span> <span>|  hello@nevtis.com  |  855.442.7107</span></div>
        <h1 className="text-3xl font-semibold text-orange-400 mt-2">UCaaS Enterprise</h1>
        <h2 className="text-2xl text-center">Quote Number: <span className='font-semibold'>{quoteNo && quoteNo}</span></h2>
        <hr className="my-2"/>
        <h2 className="font-light italic">Proposal For</h2>
        <h3 className="font-semibold text-xl">{companyName}</h3>
        <div className="px-1 md:px-0 py-2 rounded-xl">
            <img src='/nevtis-proposal-header4.png' alt="nevtis-header" className="w-full rounded-md shadow-md"/>
        </div>
        <p className="text-justify text-sm px-1 md:px-0">Welcome to NEVTIS Communications, a pioneering leader in the field of Unified Communications as a Service (UCaaS), Voice over Internet Protocol (VoIP), and Business Internet / Broadband Solutions. With over 25 years of experience in the telecommunications industry, we are dedicated to transforming the way businesses communicate and stay connected.</p>
        <div className="py-2">
            <img src='/features.png' alt="features" />
        </div>
    </div>
  )
}

export default QuoteHeader
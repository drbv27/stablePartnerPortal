import Link from "next/link"

const OurObjetive = () => {
  return (
    <div className="my-8">
        <h2 className='text-3xl text-center font-semibold mt-2 text-gray-500 mb-2'>Our Objective</h2>
        <p className="text-center text-sm">We are excited about the prospect of brining our to-tier UCaaS, VoIP, or Broadband Solutions to your esteemed organization. At NEVTIS, we believe in creating lasting partnerships and are dedicated to empowering your business with our innovative communications platforms.</p>
        <p className="text-center text-sm">We look forward to a fruitful collaboration and the opportunity to contribute to the success of your business.</p>
        <h3 className="mt-2 text-sm font-semibold">NEVTIS CORP</h3>
        <h3 className="text-sm">1525 E Ontario Ave Suite 100, Corona, CA 92881</h3>
        <div className="text-sm"><span>NEVTIS CORP |</span> <span><Link href="https://nevtis.com" className="text-orange-500">https://nevtis.com</Link></span> <span>|  hello@nevtis.com  |  855.442.7107</span></div>
    </div>
  )
}

export default OurObjetive
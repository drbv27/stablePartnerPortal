
const ContractHeader = () => {
  return (
    <>
        <div className="flex flex-col md:flex-row gap-4 w-fit">
            <div className="w-full md:w-[30%]"><img src="/logo2.png" alt="logo"  className="w-[90%]"/></div>
            <div className="w-full md:w-[70%] text-sm">
                <h3>NEVTIS CORP</h3>
                <h3>8175 E Kaiser Blvd, Suite 101, Anaheim, CA 92808</h3>
                <h3>Mailing: PO BOX 27363, Anaheim, CA 92809</h3>
                <h3>Tech Support: 855.442.7107 | www.NEVTIS.com</h3>
            </div>
        </div>
        <h1 className="text-center text-2xl font-semibold mt-4">SERVICE LEVEL AGREEMENT</h1>
        <p className="text-justify mt-2">This Nevtis Corp (here in after “Provider”) Service Level Agreement and Service Order (here in after “Service Level Agreement”) in addition to the Provider’s Terms and Conditions (here in after “Terms and Conditions”) and any additional Service Agreements, constitute the Master Agreement by and between the customer identified below (here in after “Customer”), and the Provider, and is effective as of the date last signed below.</p>
    </>
  )
}

export default ContractHeader
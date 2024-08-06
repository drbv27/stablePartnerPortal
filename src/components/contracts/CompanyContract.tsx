'use client'

const CompanyContract = ({company}:any) => {
    //console.log(company)
  return (
    <div className='px-1 md:px-6 pt-6 w-[85vw] md:w-[83vw]'>
        <table className="w-full table-auto md:table-fixed border border-gray-300">
            <thead>
            <tr>
                <th colSpan={6} className="md:px-6 py-1  border-b-2 border-gray-300 text-center text-gray-500 text-lg leading-4 md:tracking-wider bg-orange-200">Company Information</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={3} className="md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>First Name:</span> <span>{`${company?.name} ${company?.lastname}`}</span>
                    </td>
                    <td colSpan={3} className="md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold'>Email:</span> {company?.email}
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>Company:</span> <span>{company?.companyName}</span>
                    </td>
                    <td colSpan={3} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>Phone:</span> <span>{company?.phone}</span>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold'>Address 1:</span> {company?.address}
                    </td>
                    <td colSpan={3} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold'>Address 2:{company?.address2}</span> 
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold'>City:</span> {company?.city}
                    </td>
                    <td colSpan={2} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>State:</span> <span>{company?.state}</span>
                    </td>
                    <td colSpan={2} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>ZIP:</span> <span>{company?.zip}</span>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>Site:</span> {company?.siteAnalysis}
                    </td>
                    <td colSpan={2} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>Bandwith:</span> {company?.bandwith}
                    </td>
                    <td colSpan={2} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>Location:</span> {company?.locationType}
                    </td>
                </tr>
                <tr>
                    <td colSpan={3} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>Terms:</span> {company?.agreement}
                    </td>
                    <td colSpan={3} className="md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                        <span className='font-semibold block md:inline-block'>Renewal:</span> {company?.renevalTerms}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default CompanyContract
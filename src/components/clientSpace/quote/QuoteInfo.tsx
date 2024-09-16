import React from 'react';

const QuoteInfo = ({data, updatedAt, validUntil,seller}: any) => {
    return (
        <div className="my-4 border shadow-md py-2 px-4 rounded-md">
            <h3><span className="text-gray-600">Company Name:</span> {data.company.companyName}</h3>
            <h3 className="flex flex-col md:flex-row">
                <span className="text-gray-600">Service Address:</span> 
                <span className="text-sm md:ms-1">{`${data.company.address}, ${data.company.city}, ${data.company.state}, ${data.company.zip}`}</span>
            </h3>
            <h3><span className="text-gray-600">Proposal date:</span> {updatedAt}</h3>
            <h3><span className="text-gray-600">Valid until:</span> {validUntil}</h3>
            <h3><span className="text-gray-600">Location type:</span> {data.company.locationType}</h3>
            <h3><span className="text-gray-600">Site Analysis:</span> {data.company.siteAnalysis}</h3>
            <h3><span className="text-gray-600">Bandwith:</span> {data.company.bandwith}</h3>
            {seller && 
               <h3><span className="text-gray-600">Seller:</span> {seller.name} - <span className='text-xs'>{seller.email}</span></h3> 
            }
        </div>
    );
};

export default QuoteInfo;
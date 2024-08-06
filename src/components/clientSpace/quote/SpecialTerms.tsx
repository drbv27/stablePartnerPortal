import React from 'react'

const SpecialTerms = ({specialTerms}:any) => {
    //console.log(specialTerms)
  return (
    <div className='my-4'>
        <h2 className='text-xl mb-1'>Special Terms:</h2>
        <div className='p-4 border-gray-800 shadow-lg rounded-md bg-gray-100'>
            <p>{specialTerms}</p>
        </div>
    </div>
  )
}

export default SpecialTerms
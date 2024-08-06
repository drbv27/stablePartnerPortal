'use client'
import { useSpecialTerms } from '@/store/SpecialTermsStore'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'

const SpecialTerms = ({especialTerms}: {especialTerms: string}) => {
    const [localTerms, setLocalTerms] = useState('')
    const { addSpecialTerms } = useSpecialTerms()

    useEffect(() => {
        // Cargar el valor inicial en el estado local
        setLocalTerms(especialTerms || '')
    }, [especialTerms])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalTerms(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addSpecialTerms({ specialTerms: localTerms })
        Swal.fire({
            position: "top-end",
            title: 'Special Terms Saved',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
        })
    }

    //console.log(localTerms)
    //console.log(SpecialTerms)

    return (
        <div className='px-2 md:px-6 py-2 text-right shadow-md'>
            <form onSubmit={handleSubmit}>
                <h2 className='font-semibold text-left text-xl text-orange-900'>Special Terms</h2>
                <textarea
                    cols={30}
                    rows={10}
                    value={localTerms}
                    onChange={handleChange}
                    className='w-full border border-gray-400 rounded p-1'
                />
                <button type='submit' className='bg-orange-700 py-1 px-2 rounded text-white'>Save Terms</button>
            </form>
        </div>
    )
}

export default SpecialTerms
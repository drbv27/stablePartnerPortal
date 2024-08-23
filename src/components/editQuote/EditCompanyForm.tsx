'use client'
import { useState, useEffect, useCallback } from 'react'
import { MdContactEmergency, MdContactMail, MdContactPhone, MdDomain,MdSkipNext } from "react-icons/md";
import { FaCity, FaMapLocationDot } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useCompany } from '@/store/CompanyStore'
import { useTotalUsers, useTotalFax, useTotalConference } from "@/store/UserAccounts";
import { usePortNumbers } from "@/store/PortNumbersStore";
import { useTotalProducts } from '@/store/StaticProductT';
import { useTotalEntrieProducts } from '@/store/ManualEntries'

type Inputs = {
    name: string,
    lastname: string,
    email: string,
    company: string,
    areaCode: number,
    phone: number,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: number,
    siteAnalysis: string,
    bandwith: string,
    locationType: string,
    agreementTerms: string,
    renewalTerms: string,
}

export default function EditCompanyForm({quote}:any) {
    //console.log(quote)
    const router = useRouter()
    const { company,addCompany } = useCompany()
    const { totalUsers, addUser, removeUser, setTotalUsers } = useTotalUsers();
    const { totalFax, addFax, removeFax, setTotalFax } = useTotalFax();
    const { totalConference, addConference, removeConference, setTotalConference } = useTotalConference();
    const { setPortNumbers } = usePortNumbers();
    const { setProducts } = useTotalProducts();
    const { setEntrieProducts } = useTotalEntrieProducts()

    //nuevo
    const initializeForm = useCallback(() => {
        addCompany(quote.company)
        setTotalUsers(Number(quote.totalUsers))
        setTotalFax(Number(quote.totalFax))
        setTotalConference(Number(quote.totalConference))
        setPortNumbers(quote.portNumbers);
        setProducts(quote.totalProducts.map((product:any) => ({
            id: product.product._id,
            title: product.product.title,
            description: product.product.description,
            image: product.product.images[0],
            inStock: product.product.inStock,
            price: product.product.price,
            sizes: product.product.sizes,
            slug: product.product.slug,
            tags: product.product.tags,
            type: product.product.type,
            category: product.product.category,
            total: product.quantity,
            recurrent: product.product.recurrent
        })))
        setEntrieProducts(quote.totalEntrieProducts)
    }, [addCompany, setTotalUsers, setTotalFax, setTotalConference, setPortNumbers, setProducts, setEntrieProducts, quote])
    //nuevo

/*     useEffect(() => {
        addCompany(quote.company)
        setTotalUsers(Number(quote.totalUsers))
        setTotalFax(Number(quote.totalFax))
        setTotalConference(Number(quote.totalConference))
        setPortNumbers(quote.portNumbers);
        setProducts(quote.totalProducts.map((product:any) => {
            return {
                id: product.product._id,
                title: product.product.title,
                description: product.product.description,
                image: product.product.images[0],
                inStock: product.product.inStock,
                price: product.product.price,
                sizes: product.product.sizes,
                slug: product.product.slug,
                tags: product.product.tags,
                type: product.product.type,
                category: product.product.category,
                total: product.quantity,
                recurrent: product.product.recurrent
            }
            })
        )
        setEntrieProducts(quote.totalEntrieProducts)
    },[]) */


    //nuevo
    useEffect(() => {
        initializeForm()
    }, [initializeForm])
    //nuevo


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>({
        defaultValues: {
            name: quote?.company.name,
            lastname: quote?.company.lastname,
            email: quote?.company.email,
            company: quote?.company.companyName,
            areaCode: quote?.company.areaCode,
            phone: quote?.company.phone,
            address1: quote?.company.address,
            address2: quote?.company.address2,
            city: quote?.company.city,
            state: quote?.company.state,
            zip: quote?.company.zip,
            siteAnalysis: quote?.company.siteAnalysis,
            bandwith: quote?.company.bandwith,
            locationType: quote?.company.locationType,
            agreementTerms: quote?.company.agreement,
            renewalTerms: quote?.company.renevalTerms,
        }
      });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const companySend = {
            id: Math.random().toString(36).substr(2, 9),
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            companyName: data.company,
            areaCode: data.areaCode.toString(),
            phone: data.phone.toString(),
            address: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zip: data.zip.toString(),
            siteAnalysis: data.siteAnalysis,
            bandwith: data.bandwith,
            locationType: data.locationType,
            agreement: data.agreementTerms,
            renevalTerms: data.renewalTerms,
        }
        addCompany(companySend)
        router.push(`/dashboard/editQuote/user/${quote._id}`)
    }
    
    //console.log(company)
    //console.log(quote.company.address1)
    //console.log(quote)
  return (
    <div className="w-[83.5vw] h-[100%] p-2">
      <h2 className="text-xl md:text-3xl text-orange-900 text-center">Edit your company account </h2>
      <p className="text-sm text-center">The person who manages this Company account is the Account Owner and will set up the rest of your User accounts later.</p>
      <p className="text-sm text-center mb-2">Fill out the form to edit your company account</p>
      <form className="border border-gray-300 rounded-xl shadow-xl p-1 py-4 h-[80vh] md:h-[75vh] overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: true })}
                        />
                            <MdContactEmergency className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="Lastname"
                            {...register("lastname", { required: true })}
                        />
                            <MdContactEmergency className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                            <MdContactMail className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="Company Name"
                            {...register("company", { required: true })}
                        />
                            <MdDomain className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
                <div className="my-1 md:my-2 ">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="number"
                            placeholder="Area Code"
                            {...register("areaCode", { required: true })}
                        />
                            <MdContactPhone className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="tel"
                            placeholder="Phone Number"
                            {...register("phone", { required: true })}
                        />
                            <MdContactPhone className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
                <div className="my-1 md:my-2 grow-[2]">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="Address Line 1"
                            {...register("address1", { required: true })}
                        />
                            <FaMapLocationDot className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="my-1 md:my-2 grow-[1]">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="Address Line 2"
                            {...register("address2")}
                        />
                            <FaMapLocationDot className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
                <div className="my-1 md:my-2 grow-[3]">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="City"
                            {...register("city", { required: true })}
                        />
                            <FaCity className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="my-1 md:my-2 grow-[1]">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="State"
                            {...register("state", { required: true })}
                        />
                            <FaMapLocationDot className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
                <div className="my-1 md:my-2 grow-[1]">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <input
                            className="w-full p-2 bg-primary border border-input rounded-2xl"
                            type="text"
                            placeholder="Zip Code"
                            {...register("zip", { required: true })}
                        />
                            <FaMapPin className="absolute right-2 top-3 text-2xl text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <select
                            className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400"
                            {...register("siteAnalysis", { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled >Site analysis</option>
                            <option value="Commercial" className="text-gray-600">Commercial</option>
                            <option value="Residential" className="text-gray-600">Residential</option>
                        </select>
                    </div>
                </div>
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <select
                            className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400"
                            {...register("bandwith", { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled>Bandwith</option>
                            <option value="Need Quote" className="text-gray-600">Need Quote</option>
                            <option value="CBI" className="text-gray-600">CBI</option>
                            <option value="Fiber" className="text-gray-600">Fiber</option>
                            <option value="DSL" className="text-gray-600">DSL</option>
                        </select>
                    </div>
                </div>
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <select
                            className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400"
                            {...register("locationType", { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled>Location Type</option>
                            <option value="HQ" className="text-gray-600">HQ</option>
                            <option value="Branch" className="text-gray-600">Branch</option>
                            <option value="Executive Suite" className="text-gray-600">Executive Suite</option>
                        </select>
                    </div>
                </div>


            </div>
            <div className="flex flex-col md:flex-row justify-between md:gap-2 md:px-3">
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <select
                            className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400"
                            {...register("agreementTerms", { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled>Agreement Terms</option>
                            <option value="Month to Month" className="text-gray-600">Month to Month</option>
                            <option value="12 Months" className="text-gray-600">12 Months</option>
                            <option value="24 Months" className="text-gray-600">24 Months</option>
                            <option value="36 Months" className="text-gray-600">36 Months</option>
                        </select>
                    </div>
                </div>
                <div className="my-1 md:my-2 grow">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                        <select
                            className="w-full p-2 bg-primary border border-input rounded-2xl text-gray-400"
                            {...register("renewalTerms", { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled >Renewal Terms</option>
                            <option value="Month to Month" className="text-gray-600">Month to Month</option>
                            <option value="12 Months" className="text-gray-600">12 Months</option>
                            <option value="24 Months" className="text-gray-600">24 Months</option>
                            <option value="36 Months" className="text-gray-600">36 Months</option>
                        </select>
                    </div>
                </div>
            </div>
            <button className="bg-orange-400 p-1 rounded-md flex ms-auto me-4 mb-1">
            <span className="text-lg text-gray-50 font-semibold">Save </span> <MdSkipNext className="text-gray-50" size={28}/>
            </button>
        </form>
    </div>
  );
}
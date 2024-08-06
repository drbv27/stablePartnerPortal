'use client'
import { MdContactEmergency, MdContactMail, MdContactPhone, MdDomain,MdSkipNext } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaCity, FaMapLocationDot } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useCompany } from '@/store/CompanyStore'
import { createLead } from "@/actions/leads/leads-actions";


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
    notes: string,
    seller:string
}

interface User {
    name?: string;
    email?: string;
    image?: string;
    _id?: string;
  }

  interface Session {
    expires: string;
    user?: User;
  }



const NewLeadForm = () => {
    const { data: session, status } = useSession() as { data: Session | null, status: 'loading' | 'authenticated' | 'unauthenticated' };
    const router = useRouter()
    const { addCompany } = useCompany()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        //console.log(data)
        const lead = {
            name: `${data.name} ${data.lastname}`,
            email: data.email,
            sendEmail:true,
            companyName: data.company,
            phone: `${data.areaCode.toString()}${data.phone.toString()}`,
            AddressLine1: data.address1,
            AddressLine2: data.address2,
            address: `${data.address1} ${data.address2},${data.city},${data.state},${data.zip.toString()}`,
            seller:session!.user!._id,
            profilePhoto:"no foto",
            role:"lead",
            notes: data.notes,
        }
        //console.log(lead)
        const newLead = await createLead(lead)
        //console.log(newLead)

        //console.log(company)
        //router.push('/dashboard/newQuote/quote/user')
      }
      //console.log(session)
    return (
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
                            {...register("address1")}
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
                <div className="my-1 md:my-2 grow-[3]">
                    <div className="my-1 w-full relative rounded-2xl shadow-xl">
                    <textarea 
                        {...register("notes")} 
                        name="notes" 
                        id="notes" 
                        placeholder="Notes"
                        className="w-full p-2 bg-primary border border-input rounded-2xl h-[15vh] resize-none"
                    ></textarea>
                    </div>
                </div>
            </div>

            <button className="bg-orange-500 p-1 rounded-md flex ms-auto me-4 mb-1">
                <span className="text-lg text-gray-200">Save </span> <FaSave className="text-gray-200" size={25}/>
            </button>
        </form>
    )
}

export default NewLeadForm
'use client'
import { useState } from 'react'
import { useCompany } from '@/store/CompanyStore'
import { useTotalUsers, useTotalFax, useTotalConference } from '@/store/UserAccounts'
import { useTotalProducts } from '@/store/StaticProductT'
import { useTotalEntrieProducts } from '@/store/ManualEntries'
import { useSpecialTerms } from '@/store/SpecialTermsStore'
import { createQuote } from '@/actions/quotes/quotes-actions'
import { useSession, signOut } from "next-auth/react";
import { useQuoteId } from '@/store/QuoteIdStore'
import { updateQuote } from '@/actions/quotes/quotes-actions';
import { usePortNumbers } from '@/store/PortNumbersStore'
import { useRouter } from 'next/navigation'
import { FaSave } from 'react-icons/fa'
import { MdOutgoingMail } from 'react-icons/md'
import Swal from 'sweetalert2'
import { pdf } from '@react-pdf/renderer'
import { revalidatePath } from 'next/cache'
import { updateQuoteAndRevalidate } from '@/actions/editedQuotes/updateQuoteAndRevalidate'

type User = {
  _id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type Session = {
  user?: User;
  status?: string;
};

interface Props {
  params: {
    id: string;
  };
}

const SendCompoEdit = ({params}: Props) => {
    const preText = 'Dear Customer,\n\nI hope this message finds you well. I am reaching out to you on behalf of Nevtis Corp.\n\nAttached to this email, you will find our detailed proposal outlining our services. We firmly believe that our solution can significantly benefit your company. We are keen to discuss further details and address any questions you may have about our proposal. We believe that this collaboration can be mutually beneficial and look forward to the opportunity to work together.\n\nPlease feel free to contact me directly at 855-442-7107 or via email at "hello@nevtis.com" to schedule a meeting or call to discuss this proposal in detail.\n\nThank you for considering Nevtis Corp. We look forward to the opportunity to work together.\n\nBest Regards'
    const {company,resetCompany} = useCompany()
    const [ccEmail, setCcEmail] = useState('')
    const [emailText, setEmailText] = useState(preText)
    const {totalUsers,setTotalUsers} = useTotalUsers()
    const {totalFax,setTotalFax} = useTotalFax()
    const {totalConference,setTotalConference} = useTotalConference()
    const {totalProducts,resetProducts} = useTotalProducts()
    const {totalEntrieProducts,resetEntrieProducts} = useTotalEntrieProducts()
    const {specialTerms,resetSpecialTerms} = useSpecialTerms()
    const { portNumbers,resetPortNumbers } = usePortNumbers()
    const { quoteId,addQuoteId } = useQuoteId()
/*     const { data: session, status } = useSession(); */
    const { data: session, status } = useSession() as { data: Session, status: string };
    const router = useRouter();

    //console.log(sellerUser)
    //console.log(session)
  
    const dataToSend = {
        user: session?.user?._id,
        userAuth: session?.user?._id,
        company,
        status: 'new',
        pdf: 'pdf',
        totalUsers,
        totalFax,
        totalConference,
        totalProducts: totalProducts.map(product => ({ product: product.id, quantity: product.total })),
        totalEntrieProducts,
        portNumbers:portNumbers,
        specialTerms: specialTerms?.specialTerms
    }

    const handleEmailChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setCcEmail(event.target.value);
    }

    const handleTextChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
      setEmailText(event.target.value);
    }

    //console.log(totalUsers,totalFax,totalConference,totalProducts,totalEntrieProducts,specialTerms,company)
    const handleSendMail = async ({to,name,subject,dynamicLink}:any) => {
      const res = await fetch('/api/sendgrid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, name, subject, dynamicLink}),
      });
      if (res.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    };


    const handleSendMail2 = async ({to,name,text,subject,dynamicLink}:any) => {
      const dataEmail: any = { to:to, name: name, text: text, subject: subject, dynamicLink: dynamicLink }
      try {
        const res = await fetch('/api/sendgrid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataEmail),
        });
        if (res.ok) {
          console.log('Email sent successfully');
        } else {
          console.error('Error sending email');
        }
      } catch (error) {
        console.error('Error sending email');
      }
    }
    

    const handleOnlySaveQuote = async () => {
      const dataToSend = {
        company,
        pdf: 'pdf',
        specialTerms: specialTerms?.specialTerms,
        status: 'new',
        totalUsers,
        totalFax,
        totalConference,
        totalProducts: totalProducts.map(product => ({ product: product.id, quantity: product.total })),
        totalEntrieProducts,
      }
      console.log(dataToSend)
      //const updated=await updateQuote(params.id, dataToSend);
      const updated = await updateQuoteAndRevalidate(params.id, dataToSend);
      //console.log(`/dashboard/editQuote/company/${params.id}`)
      setTotalUsers(0);
      setTotalFax(0);
      setTotalConference(0);
      resetProducts();
      resetEntrieProducts();
      resetSpecialTerms();
      resetPortNumbers();
      resetCompany();
      Swal.fire({
        title: 'Updated Quote Saved',
        text: 'Review and send quote',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      router.refresh();
      router.push(`/dashboard/main`);
    }
    
    const handleSaveQuote = async () => {
      const dataToSend = {
        company,
        pdf: 'pdf',
        specialTerms: specialTerms?.specialTerms,
        status: 'new',
        totalUsers,
        totalFax,
        totalConference,
        portNumbers:portNumbers,
        totalProducts: totalProducts.map(product => ({ product: product.id, quantity: product.total })),
        totalEntrieProducts,
      }
      console.log(dataToSend)
      try{
      //const updated=await updateQuote(params.id, dataToSend);
      const updated = await updateQuoteAndRevalidate(params.id, dataToSend);
      handleSendMail2({ to:company?.email, name:company?.name,text:emailText, subject:'Updated Quote from Nevtis', dynamicLink:`https://partnerportal.nevtis.com/client/quotes/${params.id}` }) 
      //console.log(updated)
      if (ccEmail !== '') {
        handleSendMail2({ to:ccEmail, name:company?.name,text:emailText, subject:'New Quote from Nevtis', dynamicLink:`https://partnerportal.nevtis.com/client/quotes/${params.id}` }) 
      }
      setTotalUsers(0);
      setTotalFax(0);
      setTotalConference(0);
      resetProducts();
      resetEntrieProducts();
      resetSpecialTerms();
      resetPortNumbers();
      resetCompany();
      Swal.fire({
        title: 'Updated Quote and send it',
        text: 'Review and send quote',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      router.refresh();
      router.push(`/dashboard/main`);
    } catch (error) {
      console.error('Error saving and sending email');
  }
    }

  //console.log(company)
  return (
    <div className='flex flex-col justify-end my-4 mx-6 gap-2'>

    <div className='flex flex-col gap-1 w-[100%] p-2 border border-slate-200 shadow-2xl rounded-lg'>
      <input type="email" value={ccEmail} onChange={handleEmailChange} placeholder="Email-CC: (optional)" className='p-2 shadow-lg rounded-md'/>
      <textarea name="emailBody" value={emailText} cols={30} rows={10} onChange={handleTextChange}></textarea>
      <button 
        className='bg-orange-500 hover:bg-orange-400 p-2 rounded-lg text-white w-[100%] flex flex-col-reverse md:flex-row justify-center items-center gap-2 text-lg'
        onClick={handleSaveQuote}>
        <span>Save and send <span className='hidden md:inline-block'>email</span></span> <MdOutgoingMail size={30}/>
      </button>
    </div>
    <button 
      className='bg-orange-700 hover:bg-orange-800 p-2 rounded-lg text-white w-[100%] h-[50%] mt-4 flex flex-col-reverse md:flex-row justify-center items-center gap-2 text-lg'
      onClick={handleOnlySaveQuote}>
      <span>Only save <span className='hidden md:inline-block'>quote</span></span> <FaSave size={25}/>
    </button>
</div>
/*     <div>
      <input type="email" value={ccEmail} onChange={handleEmailChange} placeholder="Email-CC: (optional)" className='p-2 shadow-lg rounded-md'/>
      <textarea name="emailBody" value={emailText} cols={30} rows={10} onChange={handleTextChange}></textarea>
    <div className='flex justify-end my-4 mx-6 gap-2'>
        <button 
          className='bg-orange-700 p-2 rounded-lg text-white w-[100%] flex flex-col-reverse md:flex-row justify-center items-center gap-2 text-lg'
          onClick={handleOnlySaveQuote}>
          <span>Only save <span className='hidden md:inline-block'>quote</span></span> <FaSave size={25}/>
        </button>
        <button 
          className='bg-orange-500 p-2 rounded-lg text-white w-[100%] flex flex-col-reverse md:flex-row justify-center items-center gap-2 text-lg'
          onClick={handleSaveQuote}>
          <span>Save and send <span className='hidden md:inline-block'>email</span></span> <MdOutgoingMail size={30}/>
        </button>
    </div>
    </div> */
  )
}

export default SendCompoEdit
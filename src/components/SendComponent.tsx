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
import { usePortNumbers } from '@/store/PortNumbersStore'
import { useRouter } from 'next/navigation'
import { FaSave } from 'react-icons/fa'
import { MdOutgoingMail } from 'react-icons/md'
import Swal from 'sweetalert2'
import { revalidatePath } from 'next/cache'

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

const SendComponent = () => {
    const preText = 'Dear Customer,\n\nI hope this message finds you well. I am reaching out to you on behalf of Nevtis Corp.\n\nAttached to this email, you will find our detailed proposal outlining our services. We firmly believe that our solution can significantly benefit your company. We are keen to discuss further details and address any questions you may have about our proposal. We believe that this collaboration can be mutually beneficial and look forward to the opportunity to work together.\n\nPlease feel free to contact me directly at 855-442-7107 or via email at "hello@nevtis.com" to schedule a meeting or call to discuss this proposal in detail.\n\nThank you for considering Nevtis Corp. We look forward to the opportunity to work together.\n\nBest Regards'
    const [ccEmail, setCcEmail] = useState('')
    const [emailText, setEmailText] = useState(preText)
    const {company,resetCompany} = useCompany()
    const {totalUsers,setTotalUsers} = useTotalUsers()
    const {totalFax,setTotalFax} = useTotalFax()
    const {totalConference,setTotalConference} = useTotalConference()
    const {totalProducts,resetProducts} = useTotalProducts()
    const {totalEntrieProducts,resetEntrieProducts} = useTotalEntrieProducts()
    const {specialTerms,resetSpecialTerms} = useSpecialTerms()
    const { quoteId,addQuoteId } = useQuoteId()
    const { portNumbers,resetPortNumbers } = usePortNumbers()


    const { data: session, status } = useSession() as { data: Session, status: string };
    const router = useRouter();

    //console.log(sellerUser)
    //console.log(session)
    console.log(totalEntrieProducts)
  
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
        if (
          company !== null &&
          (
            totalUsers !== 0 ||
            totalFax !== 0 ||
            totalConference !== 0 ||
            totalProducts.length !== 0 ||
            totalEntrieProducts.length !== 0
          )
          ) {
            try {
              const {newQuote} = await createQuote(dataToSend);
              //console.log(dataToSend)
              //console.log(newQuote)
              addQuoteId(newQuote._id)
              //console.log(`${company.name} ${company.lastname}`)   
              setTotalUsers(0);
              setTotalFax(0);
              setTotalConference(0);
              resetProducts();
              resetEntrieProducts();
              resetSpecialTerms();
              resetCompany();
              Swal.fire({
                title: 'Quote Saved',
                text: 'Review and send quote',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              router.refresh();
              router.push(`/dashboard/main`);
            } catch (error) {
              Swal.fire({
                title: 'Error',
                text: 'Error saving quote',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
        }else{
        Swal.fire({
          title: 'Error',
          text: 'Please fill all the fields',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        }
    }

    const handleSaveQuote = async () => {
        if (
          company !== null &&
          (
            totalUsers !== 0 ||
            totalFax !== 0 ||
            totalConference !== 0 ||
            totalProducts.length !== 0 ||
            totalEntrieProducts.length !== 0
          )
          ) {
            try {
              const {newQuote} = await createQuote(dataToSend);
              addQuoteId(newQuote._id)
              handleSendMail({ to:company.email, name:company.name, subject:'New Quote from Nevtis', dynamicLink:`https://partnerportal.nevtis.com/client/quotes/${newQuote._id}` }) 
              /* handleSendMail({ to:company.email, name:company.name, subject:'New Quote from Nevtis', dynamicLink:`http://localhost:3000/client/quotes/${newQuote._id}` })   */ 
              if (ccEmail !== '') {
                handleSendMail({ to:ccEmail, name:company.name, subject:'New Quote from Nevtis', dynamicLink:`https://partnerportal.nevtis.com/client/quotes/${newQuote._id}` }) 
              }
              setTotalUsers(0);
              setTotalFax(0);
              setTotalConference(0);
              resetProducts();
              resetEntrieProducts();
              resetSpecialTerms();
              resetCompany();
              Swal.fire({
                title: 'Quote Saved and Email Sent',
                text: 'Review and send quote',
                icon: 'success',
                confirmButtonText: 'Ok'
              });

              router.push(`/dashboard/main`);
            } catch (error) {
              Swal.fire({
                title: 'Error',
                text: 'Error sending quote',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
        }else{
        Swal.fire({
          title: 'Error',
          text: 'You can not send an empty quote',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        }
    }

    const handleSaveNewQuote = async () => {
        if (
          company !== null &&
          (
            totalUsers !== 0 ||
            totalFax !== 0 ||
            totalConference !== 0 ||
            totalProducts.length !== 0 ||
            totalEntrieProducts.length !== 0
          )
          ) {
            try {
              const {newQuote} = await createQuote(dataToSend);
              addQuoteId(newQuote._id)
              handleSendMail2({ to:company.email, name:company.name, text:emailText, subject:'New Quote from Nevtis', dynamicLink:`https://partnerportal.nevtis.com/client/quotes/${newQuote._id}` }) 
              if (ccEmail !== '') {
                handleSendMail2({ to:ccEmail, name:company.name,text:emailText, subject:'New Quote from Nevtis', dynamicLink:`https://partnerportal.nevtis.com/client/quotes/${newQuote._id}` }) 
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
                title: 'Quote Saved and Email Sent',
                text: 'Review and send quote',
                icon: 'success',
                confirmButtonText: 'Ok'
              });

              router.refresh();
              router.push(`/dashboard/main`);
            } catch (error) {
              console.log(error)
              Swal.fire({
                title: 'Error',
                text: 'Error sending quote',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
        }else{
        Swal.fire({
          title: 'Error',
          text: 'You can not send an empty quote',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        }
    }



  //console.log(dataToSend)
  return (
    <div className='flex flex-col justify-end my-4 mx-6 gap-2'>

        <div className='flex flex-col gap-1 w-[100%] p-2 border border-slate-200 shadow-2xl rounded-lg'>
          <input type="email" value={ccEmail} onChange={handleEmailChange} placeholder="Email-CC: (optional)" className='p-2 shadow-lg rounded-md'/>
          <textarea name="emailBody" value={emailText} cols={30} rows={10} onChange={handleTextChange}></textarea>
          <button 
            className='bg-orange-500 hover:bg-orange-400 p-2 rounded-lg text-white w-[100%] flex flex-col-reverse md:flex-row justify-center items-center gap-2 text-lg'
            onClick={handleSaveNewQuote}>
            <span>Save and send <span className='hidden md:inline-block'>email</span></span> <MdOutgoingMail size={30}/>
          </button>
        </div>
        <button 
          className='bg-orange-700 hover:bg-orange-800 p-2 rounded-lg text-white w-[100%] h-[50%] mt-4 flex flex-col-reverse md:flex-row justify-center items-center gap-2 text-lg'
          onClick={handleOnlySaveQuote}>
          <span>Only save <span className='hidden md:inline-block'>quote</span></span> <FaSave size={25}/>
        </button>
    </div>
  )
}

export default SendComponent
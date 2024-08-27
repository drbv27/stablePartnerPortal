'use client'
import { useState,useRef,useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { updateStatus,createPayment } from '@/actions/clientSpace/clientspace-actions'
import { useRouter } from 'next/navigation';

import { SiVisa, SiMastercard,SiDiscover,SiAmericanexpress } from 'react-icons/si';
import SignaturePad from 'react-signature-pad-wrapper'

import toast, { Toaster } from 'react-hot-toast';
import { title } from 'process';

const notify = () => toast.success('Thank you contract sent successfully',{
  duration: 4000,
  position: 'top-right',
});

const notify2 = () => toast.success('Signature saved',{
  duration: 4000,
  position: 'top-right',
});


const CreditCard = ({id,company}) => {
    const [signature, setSignature] = useState(null);
    const [signatureData, setSignatureData] = useState(null);
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const router = useRouter();
  
    const saveSignature = () => {
      const quality = 0.5;
      const pngDataUri = signature.toDataURL('image/png', quality);
      //console.log(pngDataUri);
      setSignatureData(pngDataUri);
      notify2();
      
    };
  
    const clearHandler = () => {
      signature.clear();
      setSignatureData(null);
    }

    

    const handleAccept = async () => {
      const updatedQuote = await updateStatus(id,'signed');
    };

    const handleSendMail = async ({to,subject,htmlContent}) => {
      const res = await fetch('https://api.nevtis.com/comunication/email/partner-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, htmlContent}),
      });
      if (res.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    };
    
    const onSubmit = async (data) => {
      if (!signatureData) {
        toast.error('Please sign or "save your sign" before submitting.');
        return;
      }
      const response = await fetch('https://api.ipify.org?format=json');
      const ipData = await response.json();
      const ipAddress = ipData.ip;
      data.ipAddress = ipAddress;
      data.signature = signatureData;
      const dataToSend = {
        creditCard:{
          fullName: data.cardName,
          title: data.title,
          businessAddress: data.businesAddress,
          cardNumber: data.cardNumber,
          expirationMonth: data.expMonth,
          expirationYear: data.expYear,
          cvv: data.cvv,
          ipAddress:data.ipAddress,
        },
        sendEmail: false,
        contractStatus: 'signed',
        signatureClient: data.signature,
        signatureManager: '',
        quote:id,
      }
      console.log(dataToSend);
      handleAccept();
      const dynamicLink = `https://partnerportal.nevtis.com/dashboard/aproveQuote/${id}`;

      createPayment(dataToSend);

      handleSendMail({
        to: 'juan.o@nevtis.com',
        subject: 'Contract Signed',
        htmlContent: `
        <img src="https://ci3.googleusercontent.com/meips/ADKq_NaJNueCasTLZB2GwgzGLa43r7oCWgTX04v5bgaKjY4d7B4pZFoPVh3lNRk5J7t1NbG-izfPZ2MGtuPahQbbaXZACjiH9PwtswSHndvsaR-6Goc07AaGlyyJ2XAey-3QBbaXM_-HtA1vcC8udc-jnQYD9LVqSVc2U2AffaHdZNuyjU3Jn7Jki_uu=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/23cba222a3bf9b3c/16acc737-32a9-4075-a14f-36f8e3522adf/1000x147.png width="200px" height="30px"" />
        <p>Hello Juan:</p>
        <p><span style="font-weight:bold;color:orange">${company.companyName}</span> contract signed by <span style="text-decoration:underline;">${data.cardName}</span></p>
        <p>Please check it into <a href="${dynamicLink}" style="text-decoration: none; color:orange;">Partner Portal</a></p>
        `,
      });
      notify();
      window.location.href='https://nevtis.com'
    };
/*     const onSubmit = async (data:any) => {
      console.log(data);
    } */

    //console.log(id)
  return (
    <div className='border border-s-gray-400 border-e-gray-400 border-b-gray-400 p-4'>
    <div className='flex gap-2 text-xl'>Credit Card Authorization <span className='flex gap-1 text-2xl'><SiVisa className='text-indigo-800'/><SiMastercard className='text-red-500'/><SiDiscover className='text-orange-500'/><SiAmericanexpress className='text-blue-500'/></span></div>
    <div><h3 className='text-sm'>By signin this form, you give us permision to bill your credit card, listed below, as specified in this service agreement.</h3></div>
    <form className='p-1' onSubmit={handleSubmit(onSubmit)}>
      <div className='py-1'>
        <label htmlFor="title">Title</label>
        <input {...register('title',{ required:true,minLength:2 })} type="text" placeholder='Your Title' className='border border-gray-300 p-1 w-full'/>
        {errors.title && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      <div className='py-1'>
        <label htmlFor="cardName">Full name on Card</label>
        <input {...register('cardName',{ required:true,minLength:7 })} type="text" placeholder='Name of card holder' className='border border-gray-300 p-1 w-full'/>
        {errors.cardName && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>
      
      <div className='py-1'>
        <label htmlFor="businesAddres">Business Address</label>
        <input {...register('businesAddress',{ required:true,minLength:7 })} type="text" placeholder='Your business address' className='border border-gray-300 p-1 w-full'/>
        {errors.businesAddress && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      <div className='py-1'>
        <label htmlFor="cardNumber">Card Number</label>
        <input {...register('cardNumber',{ required:true,minLength:16 })} type="text" placeholder='Your card number' className='border border-gray-300 p-1 w-full'/>
        {errors.cardNumber && <span className='text-red-500 text-xs'>This field is required</span>}
      </div>

      <div className='flex justify-between gap-2 py-1'>
        <div>
            <label htmlFor="expMonth"><span className='hidden md:block'>Expiration Month</span><span className='block md:hidden'>Exp.Month</span></label>
            <input {...register('expMonth',{ required:true, min: 1, max: 12, pattern: /^(0[1-9]|1[0-2])$/ })} type="text" placeholder='MM' className='border border-gray-300 p-1 w-full'/>
            {errors.expMonth && <span className='text-red-500 text-xs'>Please enter a valid month (01-12).</span>}
        </div>

        <div>
            <label htmlFor="expYear"><span className='hidden md:block'>Expiration Year</span><span className='block md:hidden'>Exp.Year</span></label>
            <input {...register('expYear',{ required:true, min: 24, max: 34 })} type="text" placeholder='YY' className='border border-gray-300 p-1 w-full'/>
            {errors.expYear && <span className='text-red-500 text-xs'>Please enter a valid year (24+=).</span>}
        </div>
        <div>
            <label htmlFor="cvv">CVV</label>
            <input {...register('cvv',{ required:true,minLength:3,pattern: /^[0-9]{3,4}$/ })} type="text" placeholder='CVV' className='border border-gray-300 p-1 w-full'/>
            {errors.cvv && <span className='text-red-500 text-xs'>Please enter a valid CVV (3-4 digits).</span>}
        </div>

      </div>

      <div>
        <h3 className='mt-2 font-semibold'>Electronic Signature Disclosure</h3>
        <p className='text-xs'>By signin and accepting below you are acknowledging that you have read and agree to the terms and conditions outlined in this document.</p>
        <h3 className='mt-2 text-center font-semibold underline decoration-solid'>Agreement</h3>
        <p className='text-xs mt-2 text-center mb-4 italic font-light'>
            THIS SERVICE AGREEMENT AND SERVICE ORDER HEREBY INCORPOORTE BY REFERENCE THE TERMS AND CONDITIONS (AVAILABLE AT https://www.nevtis.com/legal), A COPY OF WHICH WILL BE PROVIDED TO CUSTOMER UPON REQUEST. BY EXECUTING THIS DOCUMENT BELOW, CUSTOMER ACKNOLEDGES THAT: (1) CUSTOMER ACCEPTS TO BE BOUND BY THER TERMS AND CONDITIONS, INCLUDING SECTION 21 THEREOF, WHICH PROVIDES TAHT THE PARTIES DESIRE TO RESOLVE DISPUTES RELATING TO THE PROVIDERS MASTER AGREEMENT THROUGH ARBITRATION; AND (2) BY AGREEING TO ARBITRATION, CUSTOMER IS GIVING UP VARIOUS RIGHTS, INCLUDING THE RIGHT TO TRIAL BY JURY.
        </p>
        <div className='border border-gray-200 shadow-xl'>

          <SignaturePad 
            ref={(ref) => setSignature(ref)}
            options={{
              penColor: 'black',
              backgroundColor: 'white',
            }}
            redrawOnResize
          />
          <div className='flex justify-center gap-2 border border-t-gray-300 py-1'>
            <button 
              type="button" 
              onClick={clearHandler}
              className='bg-red-300 text-white px-2 rounded-md'
            >
              Clear
            </button>
            <button 
              type="button" 
              onClick={saveSignature}
              className='bg-green-300 text-white px-2 rounded-md'
            >
              Save
            </button>
          </div>
        </div>
        
      </div>

      <input type="submit" value="SUBMIT" className='w-full bg-orange-400 text-white font-semibold text-lg py-1 px-2 rounded-md mt-4 cursor-pointer'/>
    </form>
    <Toaster />
  </div>
  )
}

export default CreditCard
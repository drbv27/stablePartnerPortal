'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateStatus,createPayment } from '@/actions/clientSpace/clientspace-actions'
import { updateContract } from '@/actions/payments/payment-actions';
import { useRouter } from 'next/navigation';

import SignaturePad from 'react-signature-pad-wrapper'

import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Thank you contract sent successfully',{
  duration: 4000,
  position: 'top-right',
});

const notifysign = () => toast.success('Siganture, was saved',{
  duration: 4000,
  position: 'top-right',
});

const AproveContract = ({contract}) => {

    const [signature, setSignature] = useState(null);
    const [signatureData, setSignatureData] = useState(null);
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const router = useRouter();

    const saveSignature = () => {
      const quality = 0.5;
      const pngDataUri = signature.toDataURL('image/png', quality);
      //console.log(pngDataUri);
      notifysign();
      setSignatureData(pngDataUri);
    };

    const clearHandler = () => {
      signature.clear();
      setSignatureData(null);
    }

    const handleSign = async (id,quote) => {
      const updatedContract = await updateContract(id,quote);
      console.log(updatedContract)
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
      if (!signature) {
        toast.error('Please sign before submitting.');
        return;
      }
      const response = await fetch('https://api.ipify.org?format=json');
      const ipData = await response.json();
      const ipAddress = ipData.ip;
      data.ipAddress = ipAddress;
      data.signature = signatureData;
      console.log(data.signature);
      const dataToSend = {
        contractStatus: 'approved',
        signatureManager: data.signature,
      }
      console.log(dataToSend);
      handleSign(contract._id, dataToSend);
      const dynamicLink = `https://partnerportal.nevtis.com/client/signed/${contract.quote._id}`;

      handleSendMail({
        to: 'juan.o@nevtis.com',
        subject: 'Contract Approved',
        htmlContent: `
        <img src="https://ci3.googleusercontent.com/meips/ADKq_NaJNueCasTLZB2GwgzGLa43r7oCWgTX04v5bgaKjY4d7B4pZFoPVh3lNRk5J7t1NbG-izfPZ2MGtuPahQbbaXZACjiH9PwtswSHndvsaR-6Goc07AaGlyyJ2XAey-3QBbaXM_-HtA1vcC8udc-jnQYD9LVqSVc2U2AffaHdZNuyjU3Jn7Jki_uu=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/23cba222a3bf9b3c/16acc737-32a9-4075-a14f-36f8e3522adf/1000x147.png width="200px" height="30px"" />
        <p>Hello Juan:</p>
        <p><span style="font-weight:bold;color:orange">${contract.quote.company.companyName}</span> contract approved by Nevtis </p>
        <p>Please check it <a href=${dynamicLink} style="font-weight:bold;color:orange">Here</a></p>
        `,
      });

      handleSendMail({
        to: `${contract.quote.company.email}`,
        subject: 'Contract Approved',
        htmlContent: `
        <img src="https://ci3.googleusercontent.com/meips/ADKq_NaJNueCasTLZB2GwgzGLa43r7oCWgTX04v5bgaKjY4d7B4pZFoPVh3lNRk5J7t1NbG-izfPZ2MGtuPahQbbaXZACjiH9PwtswSHndvsaR-6Goc07AaGlyyJ2XAey-3QBbaXM_-HtA1vcC8udc-jnQYD9LVqSVc2U2AffaHdZNuyjU3Jn7Jki_uu=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/23cba222a3bf9b3c/16acc737-32a9-4075-a14f-36f8e3522adf/1000x147.png width="200px" height="30px"" />
        <p>Hello ${contract.quote.company.name}:</p>
        <p><span style="font-weight:bold;color:orange">${contract.quote.company.companyName}</span> contract approved by Nevtis </p>
        <p>Please check it <a href=${dynamicLink} style="font-weight:bold;color:orange">Here</a></p>
        `,
      });
      notify();
      router.push('/dashboard/main');
    };

    //console.log(contract)
  return (
    <div className='border border-s-gray-400 border-e-gray-400 border-b-gray-400 p-4'>
      <form className='p-1' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h3 className='mt-2 font-semibold text-xl'>Sign and approve</h3>
          <p className='text-xs'>do yo want approve?.</p>
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

export default AproveContract
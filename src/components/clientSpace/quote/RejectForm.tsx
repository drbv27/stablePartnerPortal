'use client'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Email sent successfully');

const RejectForm = ({company}:any) => {
    const { register, handleSubmit } = useForm();

    const handleSendMail = async ({to,subject,htmlContent}:any) => {
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

    const onSubmit = (data: any) => {
    //console.log(data);
    //console.log(quoteData)
    handleSendMail({
        to: 'juan.o@nevtis.com',
        subject: 'Feedback on rejected quote',
        htmlContent: `
          <div style="font-size:1.1rem">
            <img src="https://ci3.googleusercontent.com/meips/ADKq_NaJNueCasTLZB2GwgzGLa43r7oCWgTX04v5bgaKjY4d7B4pZFoPVh3lNRk5J7t1NbG-izfPZ2MGtuPahQbbaXZACjiH9PwtswSHndvsaR-6Goc07AaGlyyJ2XAey-3QBbaXM_-HtA1vcC8udc-jnQYD9LVqSVc2U2AffaHdZNuyjU3Jn7Jki_uu=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/23cba222a3bf9b3c/16acc737-32a9-4075-a14f-36f8e3522adf/1000x147.png width="200px" height="30px"" />
            <p>${company.name} ${company.lastname} from <span style="font-weight: bold">${company.companyName}</span></p>
            <p>Reject the quote.</p>
            <p><span style="font-weight:bold">Feedback:</span> ${data.feedback}</p>
          </div>`,
      });
      notify();
      window.location.href='https://nevtis.com'
      // You can navigate or do other things with the form data here
      };
      console.log(company)
  return (
    <div className='mx-1 md:mx-6 border-gray-700 rounded-md shadow-lg mt-8 py-2'>
    <h1 className='text-orange-600 text-center font-semibold text-3xl'>Thank you for considering</h1>
    <div className='w-full flex justify-center'>
      <div className='w-3/4 md:w-1/3 py-1'>
        <img src="/logo2.png" alt="logo" />
      </div>
    </div>
    <h2 className='text-orange-600 text-center'>for your telecommunications needs.</h2>
    <p className='px-1 md:px-6 text-center mt-1 text-gray-500 font-semibold'> We understand you have rejected the current quote, and value your feedback to help us improve our services.</p>
    <p className='text-lg px-1 md:px-6 text-center mt-1 text-gray-600 font-semibold'>Could you please share the primary reason for your decision?</p>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>
      <textarea 
        {...register('feedback')} 
        rows={8} cols={50} 
        placeholder="Please provide your feedback here"
        className='w-[96%] border border-gray-300 rounded-md p-2 mt-2 md:mt-4'
      >
      </textarea>
      <button 
        type="submit"
        className='bg-orange-600 text-white text-lg font-semibold rounded py-2 px-4 mt-4 md:mt-8 hover:bg-orange-700'
      >
        Submit
      </button>
    </form>
    <Toaster />
  </div>
  )
}

export default RejectForm
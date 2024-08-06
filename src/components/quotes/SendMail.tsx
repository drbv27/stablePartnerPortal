'use client'
import {useState} from 'react';
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form';
import ReactPdfs from "@/components/clientSpace/quote/ReactPdfs";
import { PDFViewer,pdf } from "@react-pdf/renderer";
import { updateQuote, getQuote } from '@/actions/quotes/quotes-actions';
import { FaFileUpload,FaCloudUploadAlt,FaFilePdf } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface Quote {
    _id?: string | undefined;
    company: {
      name: string;
      lastname: string;
      email: string;
    };
    totalProducts: number;
    totalEntrieProducts: number;
    totalUsers: number;
    totalFax: number;
    totalConference: number;
    pdf: string;
  }

interface ManageApprovedProps {
quote: Quote;
}

const SendMail: React.FC<ManageApprovedProps> = ({quote}) => {
  const [fileName, setFileName] = useState('');
  const { handleSubmit, control } = useForm();
  const router = useRouter()

  const onSubmit = async (data: any) => {
    if (data.file && data.file[0]) {
      const formData = new FormData();
      //console.log(data.file[0])
      formData.append('file', data.file[0]);

      try {
        const response = await fetch('https://api.nevtis.com/marketplace/files/create', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('File upload failed');
        }

        const responseData = await response.json();
        if (quote._id) {
          const updated = await updateQuote(quote._id, { ...quote, pdf: responseData.key });
          //console.log(updated);
          Swal.fire({
            title: 'Success',
            text: 'File uploaded successfully',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          console.error('quote._id is undefined');
        }
        /* const updated = await updateQuote(quote._id, { ...quote, pdf: responseData.key }); */

        //console.log(responseData);
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'File upload failed',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  };

  const handleSendMail = async () => {
    const dataToSend = {
      to: quote.company.email,
      name:`${quote.company.name} ${quote.company.lastname}` ,
      link: quote.pdf,
      /* link: `https://api.nevtis.com/marketplace/files/list/${quote.pdf}` */
    };
    //console.log(dataToSend)

    try {
      const response = await fetch('https://api.nevtis.com/comunication/email/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Email sending failed');
      }

      const responseData = await response.text();
      Swal.fire({
        title: 'Success',
        text: 'Email sent successfully',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        router.push('/main');
      });
      //console.log(responseData);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Email sending failed',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

//console.log(quote)
  return (
    <>
      <h1 className='text-2xl text-center font-semibold text-orange-800'>Send Quote to Client</h1>
      <h2 className='text-lg text-center'>Please review the quote before sending,and follow the steps:</h2>
      <h2 className='pl-2'>1.<span className='text-orange-500'>Download the pdf </span> file to your local machine first 🔽</h2>
      <PDFViewer style={{ width: "100%", height: "45vh", padding:"1vw" }}>
        <ReactPdfs 
          company={quote.company} 
          totalProducts={quote.totalProducts}
          totalEntrieProducts={quote.totalEntrieProducts}
          totalUsers={quote.totalUsers}
          totalFax={quote.totalFax}
          totalConference={quote.totalConference}
        />
      </PDFViewer>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='border rounded p-2 bg-white mx-4 shadow-xl'>
          <h2>2. Please, now <span className='text-orange-500'>upload the file</span> to DB.</h2>
          <div className='flex justify-evenly'>
            <Controller
              name="file"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="flex items-center justify-center bg-grey-lighter">
                  <label className="w-48 flex flex-col items-center px-4 py-2 bg-orange-100 text-orange-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-orange-800">
                    <FaFilePdf size={30} />
                    <span className="mt-2 text-sm">Select the file</span>
                    <input type='file' className="hidden" onChange={(event) => {
                      if (event.target.files) {
                        field.onChange(event.target.files);
                        setFileName(event.target.files[0].name);
                      }
                    }} />
                  </label>
                  {fileName && <span className="mt-2 text-base leading-normal mx-2 text-orange-900 font-semibold">{fileName}</span>}
                </div>
              )}
            />
            <button type="submit" className='flex flex-col px-4 bg-orange-500 text-white justify-center items-center shadow-xl rounded-md hover:bg-orange-400'><FaCloudUploadAlt size={30}/> Upload File</button>
          </div>
         
        </div>

      </form>

      <div className='bg-white mt-4 shadow-xl rounded-md mx-4 text-center py-1'>
        <h2 className='text-left pl-2'>3.Send <span className='text-orange-500'>Email</span></h2>
        <h2>To:{quote.company.name} {quote.company.lastname}</h2>
        <h2>email: {quote.company.email}</h2>
        <button onClick={handleSendMail} className='bg-orange-500 px-4 py-1 text-white rounded-md'>Send</button>
      </div>

    </>
  );
};

export default SendMail;
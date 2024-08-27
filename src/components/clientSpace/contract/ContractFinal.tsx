'use client'
import { PDFViewer,pdf, PDFDownloadLink } from "@react-pdf/renderer";
import ContractHeader from "./ContractHeader";
import ContractInfo from "./ContractInfo";
import ReactPdfs from "./ReactPdfs";
import ReactPdfFC from "./ReactPdfFC";
import MonthlyContract from "./MonthlyContract";
import OneTimeContract from "./OneTimeContract";
import SpecialTerms from "../quote/SpecialTerms";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PaymentInfo from "./PaymentInfo";

const ContractFinal = ({data,id,contract}:any) => {
  //console.log(data)
  if (!data) {
    return <div>Loading...</div>;
  }
  //console.log(data)
  return (
    <div className='w-full flex flex-col md:flex-row p-8 overflow-y-auto'>
      <div className='w-full md:w-[75%] pr-2'>
        <ContractHeader />
        <ContractInfo company={data.company} dataAll={data}/>
        <MonthlyContract data={data}/>
        <OneTimeContract data={data}/>
        <hr className='my-4'/>
        { data.specialTerms && data.specialTerms!=="" &&
          <div className="w-full border border-gray-300 mt-4 p-4 rounded-md">
            <SpecialTerms specialTerms={data.specialTerms}/>
          </div>
        }
        <div className='mt-4'>
          {contract && contract.billMeLater && 
            <div className='border border-gray-400 rounded-md p-4'>
              <div className='flex gap-2 text-xl justify-center'>Bill Me Later Information </div>
              <div><h3 className='text-sm mb-2'>We send the Invoice to your email.</h3></div>
              <div><h3><span className="font-semibold">Invoice Name:</span> {contract.billMeLater.fullName}</h3></div>
              <div><h3><span className="font-semibold">Bussines address:</span> {contract.billMeLater.businessAddress}</h3></div>
              <div className="flex justify-center pt-4 gap-8">
                <div className="flex flex-col justify-center items-center">
                  <div className="w-[22vw]">
                    <img src={contract.signatureClient} alt="signature" className='full'/>
                  </div>
                  <hr className="h-[2px] bg-black w-full" />
                  <small>Authorized Signature for</small>
                  <small>customer</small>
                  <p className="mt-1">{data.company.name} {data.company.lastname}</p>
                  <hr className="h-[2px] bg-black w-full" />
                  <small>Printed name</small>
                  <p className="mt-1"> {contract.billMeLater.title || '-'} </p>
                  <hr className="h-[2px] bg-black w-full" />
                  <small>Title</small>
                  <p className="mt-1">{contract.signDate.substring(0,10)}</p>
                  <hr className="h-[2px] bg-black w-full" />
                  <small>Date Signed</small>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="w-[22vw]">
                    <img src={contract.signatureManager} alt="signature" className='w-full'/>
                  </div>
                  <hr className="h-[2px] bg-black w-full" />
                  <small>Authorized Signature for</small>
                  <small>Nevtis Corp.</small>
                  <p className="mt-1">Juan Olmedo</p>
                  <hr className="h-[2px] bg-black w-full" />
                  <small>Printed name</small>
                  <p className="mt-1">VP of Operations</p>
                  <hr className="h-[2px] bg-black w-full" />
                  <small>Title</small>
                  <p className="mt-1">{contract.signDate.substring(0,10)}</p>
                  <hr className="h-[2px] bg-black w-full" />
                  <small>Date Signed</small>
                </div>
              </div>
            </div>
          }
          {contract && contract.creditCard && 
            <div className='border border-gray-400 rounded-md p-4'>
            <div className='flex gap-2 text-xl justify-center'>Credit Card Authorization </div>
            <div><h3 className='text-sm mb-2'>By signin this form you give us permission to bill your credit card. listed below as specified in this service agreement.</h3></div>
            <div><h3><span className="font-semibold">Card Holder Name:</span> {contract.creditCard.fullName}</h3></div>
            <div><h3><span className="font-semibold">Credit card number: </span>XXXX - XXXX - XXXX - {contract.creditCard.cardNumber.substring(13,16)}</h3></div>
            <div>
              <h3><span className="font-semibold">VCC #:</span> XXX</h3>
              <h3><span className="font-semibold">Expiration date:</span>XX/{contract.creditCard.expirationYear}</h3>
            </div>
            <div><h3><span className="font-semibold">Business address:</span> {contract.creditCard.businessAddress}</h3></div>
            <div className="flex justify-center pt-4 gap-8">
              <div className="flex flex-col justify-center items-center">
                <div className="w-[22vw]">
                  <img src={contract.signatureClient} alt="signature" className='full'/>
                </div>
                <hr className="h-[2px] bg-black w-full" />
                <small>Authorized Signature for</small>
                <small>customer</small>
                <p className="mt-1">{data.company.name} {data.company.lastname}</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Printed name</small>
                <p className="mt-1"> {contract.creditCard.title || '-'} </p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Title</small>
                <p className="mt-1">{contract.signDate.substring(0,10)}</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Date Signed</small>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="w-[22vw]">
                  <img src={contract.signatureManager} alt="signature" className='w-full'/>
                </div>
                <hr className="h-[2px] bg-black w-full" />
                <small>Authorized Signature for</small>
                <small>Nevtis Corp.</small>
                <p className="mt-1">Juan Olmedo</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Printed name</small>
                <p className="mt-1">VP of Operations</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Title</small>
                <p className="mt-1">{contract.signDate.substring(0,10)}</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Date Signed</small>
              </div>
            </div>
          </div>
          }
          {contract && contract.bankTransfer && 
            <div className='border border-gray-400 rounded-md p-4'>
            <div className='flex gap-2 text-xl justify-center'>Bank Transfer Information </div>
            <div><h3 className='text-sm mb-2'>By signin this form, you give us permision to verify your bank information, listed below, as specified in this service agreement.</h3></div>
            <div><h3><span className="font-semibold">Bank Name:</span> {contract.bankTransfer.bankName}</h3></div>
            <div><h3><span className="font-semibold">Account number:</span>{contract.bankTransfer.accountNumber}</h3></div>
            <div><h3><span className="font-semibold">Routing number:</span>{contract.bankTransfer.routingNumber}</h3></div>
            <div className="flex justify-center pt-4 gap-8">
              <div className="flex flex-col justify-center items-center">
                <div className="w-[22vw]">
                  <img src={contract.signatureClient} alt="signature" className='full'/>
                </div>
                <hr className="h-[2px] bg-black w-full" />
                <small>Authorized Signature for</small>
                <small>customer</small>
                <p className="mt-1">{data.company.name} {data.company.lastname}</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Printed name</small>
                <p className="mt-1"> {contract.bankTransfer.title || '-'} </p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Title</small>
                <p className="mt-1">{contract.signDate.substring(0,10)}</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Date Signed</small>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="w-[22vw]">
                  <img src={contract.signatureManager} alt="signature" className='w-full'/>
                </div>
                <hr className="h-[2px] bg-black w-full" />
                <small>Authorized Signature for</small>
                <small>Nevtis Corp.</small>
                <p className="mt-1">Juan Olmedo</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Printed name</small>
                <p className="mt-1">VP of Operations</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Title</small>
                <p className="mt-1">{contract.signDate.substring(0,10)}</p>
                <hr className="h-[2px] bg-black w-full" />
                <small>Date Signed</small>
              </div>
            </div>
          </div>
          }
        </div>

      </div>
      {/* Render contract details or form */}
      <div className='w-[90%] md:w-[25%] my-2'>
            <div className='md:mt-4 border border-gray-200 py-2 md:py-4 rounded-md shadow-md'>
                <h3 className='text-center text-sm mt-2 font-semibold'>Pdf file for Print? </h3>
                <div className='p-2 shadow-lg bg-gray-50 border-gray-100 rounded-md hidden md:block'>
                    <PDFViewer style={{ width: "100%", height: "30vh", padding:"1vw" }}>
                        <ReactPdfFC
                        company={data.company} 
                        totalProducts={data.totalProducts}
                        totalEntrieProducts={data.totalEntrieProducts}
                        totalUsers={data.totalUsers}
                        totalFax={data.totalFax}
                        totalConference={data.totalConference}
                        portNumbers={data.portNumbers}
                        specialTerms={data.specialTerms}
                        contract={contract}
                        />
                    </PDFViewer>
                </div>
                <div  className='mt-2 md:mt-4 text-center'>
                    <PDFDownloadLink
                        document={<ReactPdfFC company={data.company} totalProducts={data.totalProducts} totalEntrieProducts={data.totalEntrieProducts} totalUsers={data.totalUsers} totalFax={data.totalFax} totalConference={data.totalConference} portNumbers={data.portNumbers} specialTerms={data.specialTerms} contract={contract} />}
                        fileName="contract.pdf"
                        style={{
                            textDecoration: "none",
                            padding: "6px",
                            backgroundColor: "#fdba74",
                            border: "1px solid #7c2d12",
                            borderRadius: "5px",
                            marginTop: "50px",
                            color: "white",
                            fontWeight: "bold",
                        }}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? "Loading document..." : "Download pdf"
                        }
                    </PDFDownloadLink>
                </div>
            </div>

        </div>
    </div>
    
  );
}

export default ContractFinal
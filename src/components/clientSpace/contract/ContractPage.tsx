'use client'
import { PDFViewer,pdf, PDFDownloadLink } from "@react-pdf/renderer";
import ContractHeader from "./ContractHeader";
import ContractInfo from "./ContractInfo";
import ReactPdfs from "./ReactPdfs";
import MonthlyContract from "./MonthlyContract";
import OneTimeContract from "./OneTimeContract";
import SpecialTerms from "../quote/SpecialTerms";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PaymentInfo from "./PaymentInfo";

const ContractPage = ({data,id}:any) => {
  //console.log(data)
  if (!data) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className='w-[97vw] flex flex-col md:flex-row p-8 overflow-y-auto'>
      <div className='w-full md:w-4/5'>
        <ContractHeader />
        <ContractInfo company={data.company} dataAll={data}/>
        <MonthlyContract data={data}/>
        <OneTimeContract data={data}/>
        <hr className='my-4'/>
        <div className="w-full border border-gray-300 mt-4 p-4 rounded-md">
          <SpecialTerms specialTerms={data.specialTerms}/>
        </div>
        <div className='mt-4'>
          <Tabs>
            <TabList>
              <Tab>Sign Here</Tab>
              <Tab>Send Email</Tab>
            </TabList>
            <TabPanel>
              <PaymentInfo id={data._id} company={data.company}/>
            </TabPanel>
            <TabPanel>
              <h2>SEND EMAIL COMPONENT</h2>
            </TabPanel>
          </Tabs>
        </div>

      </div>
      {/* Render contract details or form */}
      <div className='w-[90%] md:w-[20%] my-2'>
            <div className='md:mt-4 border border-gray-200 py-2 md:py-4 rounded-md shadow-md'>
                <h3 className='text-center text-sm mt-2 font-semibold'>Pdf file for Print? </h3>
                <div className='p-2 shadow-lg bg-gray-50 border-gray-100 rounded-md hidden md:block'>
                    <PDFViewer style={{ width: "100%", height: "30vh", padding:"1vw" }}>
                        <ReactPdfs
                        company={data.company} 
                        totalProducts={data.totalProducts}
                        totalEntrieProducts={data.totalEntrieProducts}
                        totalUsers={data.totalUsers}
                        totalFax={data.totalFax}
                        totalConference={data.totalConference}
                        portNumbers={data.portNumbers}
                        specialTerms={data.specialTerms}
                        />
                    </PDFViewer>
                </div>
                <div  className='mt-2 md:mt-4 text-center'>
                    <PDFDownloadLink
                        document={<ReactPdfs company={data.company} totalProducts={data.totalProducts} totalEntrieProducts={data.totalEntrieProducts} totalUsers={data.totalUsers} totalFax={data.totalFax} totalConference={data.totalConference} portNumbers={data.portNumbers} specialTerms={data.specialTerms} />}
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
                            loading ? "Loading document..." : "Download Pdf"
                        }
                    </PDFDownloadLink>
                </div>
            </div>

        </div>
    </div>
    
  );
}

export default ContractPage
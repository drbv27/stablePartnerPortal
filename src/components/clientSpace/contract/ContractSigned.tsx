'use client'
import { PDFViewer,pdf, PDFDownloadLink } from "@react-pdf/renderer";
import ReactPdfFC from "./ReactPdfFC";

const ContractPage = ({data,id,contract}:any) => {
  //console.log(contract)
  //console.log(data)
  return (
    <div className='w-[97vw] flex flex-col md:flex-row p-8 overflow-y-auto'>
      {/* Render contract details or form */}
      <div className='w-[90%] my-2 mx-auto'>
            <div className='md:mt-1 border border-gray-200 py-2 md:py-4 rounded-md shadow-md'>
                <h3 className='text-center text-sm mt-2 font-semibold'>Download or print your contract. </h3>
                <div className='p-2 shadow-lg bg-gray-50 border-gray-100 rounded-md hidden md:block'>
                    <PDFViewer style={{ width: "100%", height: "70vh", padding:"1vw" }} >
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
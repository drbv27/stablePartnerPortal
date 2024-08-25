import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { RiBankCardFill, RiBankFill } from 'react-icons/ri';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import 'react-tabs/style/react-tabs.css';
import Prueba from './Prueba';
import CreditCard from './CreditCard';
import BankTransfer from './BankTransfer';
import BillMeLater from './BillMeLater';

const PaymentInfo = ({id,company}:any) => {
  //console.log(id)
  return (
    <div className='border border-gray-600 rounded-md p-2'>
      <div className='flex gap-2'>
        <h2 className='text-3xl'>Payment Information</h2>
        <div className='flex flex-col md:flex-row'>
          <div className='w-[10vw] md:w-[4.5vw]'>
            <img src="/secure.png" alt="secure" className='w-full'/>
          </div>
          <div>
            <h3 className='text-sm md:text-base md:tracking-wider'>S E C U R E</h3>
            <p className='text-xs tracking-tighter'>SSL ENCRYPTION</p>
          </div>
        </div>
      </div>
        <h3 className='text-xs text-center text-red-500 font-semibold'>Please choose a way to be billed 🔻</h3>
      <Tabs>
        <TabList>
          <Tab>
            <div className='text-orange-600 flex gap-2 items-center bg-orange-50 p-1 rounded-t-md text-2xl md:text-base'>
              <span className='hidden md:block'>Credit Card</span><span className='text-base block md:hidden'>C.C</span> <RiBankCardFill/>
            </div>
          </Tab>
          <Tab>
            <div className='text-orange-600 flex gap-2 items-center bg-orange-50 p-1 rounded-t-md text-2xl md:text-base'>
              <span className='hidden md:block'>Bank Transfer</span><span className='text-base block md:hidden'>B.T</span> <RiBankFill/>
            </div>
          </Tab>
          <Tab>
            <div className='text-orange-600 flex gap-2 items-center bg-orange-50 p-1 rounded-t-md text-2xl md:text-base'>
              <span className='hidden md:block'>Bill me later</span><span className='text-base block md:hidden'>B.M.L</span> <LiaFileInvoiceDollarSolid/>
            </div>
          </Tab>
        </TabList>

        <TabPanel>
          <CreditCard id={id} company={company}/>
        </TabPanel>
        <TabPanel>
          <BankTransfer id={id} company={company}/>
        </TabPanel>
        <TabPanel>
          <BillMeLater id={id} company={company}/>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default PaymentInfo
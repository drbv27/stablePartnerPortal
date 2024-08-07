'use client'
import { useTotalProducts } from "@/store/StaticProductT"
import { useTotalEntrieProducts } from "@/store/ManualEntries"
import { useTotalUsers, useTotalFax, useTotalConference } from "@/store/UserAccounts"
import { usePortNumbers } from '@/store/PortNumbersStore';


const MonthlyCharges = () => {
    const { totalProducts } = useTotalProducts()
    const { totalEntrieProducts } = useTotalEntrieProducts()
    const {totalUsers} = useTotalUsers();
    const {portNumbers} = usePortNumbers();
    const {totalFax} = useTotalFax();
    const {totalConference} = useTotalConference();
    let monthlyTotal = 0;
    let oneTimeTotal = 0;
    let monthlyEntries = 0;
    let oneTimeEntries = 0;

    //***********ojo este debe venir de la db******//
    const Users = {title:'Nationwide Unlimited Calling: Business VoIP Phone Service',price:24.99,total:totalUsers}
    const Fax = {title:'Nationwide Unlimited EFax service',price:7.99,total:totalFax}
    const Conference = {title:'Conference',price:14.99,total:totalConference}
    //***********ojo este debe venir de la db******//

    if (totalProducts.length !== 0) {
        monthlyTotal = totalProducts.reduce((acc, product) => product.recurrent ? acc + product.total * product.price : acc, 0)
        oneTimeTotal = totalProducts.reduce((acc, product) => !product.recurrent ? acc + product.total * product.price : acc, 0)
    }
    if (totalEntrieProducts.length !== 0) {
        monthlyEntries = totalEntrieProducts.reduce((acc, product) => product.recurrent ? acc + product.quantity * product.price : acc, 0)
        oneTimeEntries = totalEntrieProducts.reduce((acc, product) => !product.recurrent ? acc + product.quantity * product.price : acc, 0)
    }

    if (portNumbers.length > 2) {
        monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price+((portNumbers.length - 2) * 2.00);
    }else{
        monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price;
    }
    
    /* monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price; */
    oneTimeTotal += oneTimeEntries;
    monthlyTotal = parseFloat(monthlyTotal.toFixed(2));
    oneTimeTotal = parseFloat(oneTimeTotal.toFixed(2));
    //console.log(monthlyEntries)
    //console.log(totalEntrieProducts)
    //console.log(portNumbers)
    //console.log(totalUsers)
  return (
    <div className='px-1 md:px-6 pt-6'>
        <table className="w-full border border-gray-500">
            <thead>
            <tr>
                <th colSpan={6} className="px-1 md:px-6 py-1  border border-gray-300 text-left text-gray-500  tracking-wider">
                    Order Details(Review Your Order)
                </th>
            </tr>
            <tr>
                <th colSpan={6} className="px-1 md:px-6 py-1  border border-gray-300 text-center text-base text-gray-500 tracking-wider bg-orange-200">
                    Monthly Charges
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colSpan={3} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                    Description
                </td>
                <td colSpan={1} className="px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center text-sm md:text-base">
                    Qty
                </td>
                <td colSpan={1} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center text-sm md:text-base">
                    Rate
                </td>
                <td colSpan={1} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-sm md:text-base">
                    Total
                </td>
            </tr>

            {Users.total !== 0 &&
                <tr>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base">
                        {Users.title}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center text-sm md:text-base">
                        {Users.total}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        <span>$</span><span className="md:ms-1">{Users.price.toFixed(2)}</span>
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        <span>$</span><span className="md:ms-1">{(Users.total * Users.price).toFixed(2)}</span>
                    </td>
                </tr>
            }
            {Fax.total !== 0 &&
                <tr>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base">
                        {Fax.title}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center text-sm md:text-base">
                        {Fax.total}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        $ {Fax.price.toFixed(2)}
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        $ {(Fax.total * Fax.price).toFixed(2)}
                    </td>
                </tr>
            }
            {Conference.total !== 0 &&
                <tr>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base">
                        {Conference.title}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center text-sm md:text-base">
                        {Conference.total}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        <span>$</span><span className="md:ms-1">{Conference.price.toFixed(2)}</span>
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        $ {(Conference.total * Conference.price).toFixed(2)}
                    </td>
                </tr>
            }
            { portNumbers.length !== 0 &&
                <tr>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base">
                        Port Numbers {portNumbers.map((port, index) => <span key={index} className="font-normal"> | {port}</span>)}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center text-sm md:text-base">
                        {portNumbers.length-2>0 ? portNumbers.length-2 : 0}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        $ 2.00
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        $ {portNumbers.length-2>0 ? ((portNumbers.length-2)*2).toFixed(2) : 0}
                    </td>
                </tr>
            }

            {totalProducts.filter(product => product.recurrent).map((product) => (
                <tr key={product.id}>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base">
                        {product.title} | <small className="font-normal"> {product.description}</small>
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center text-sm md:text-base">
                        {product.total}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        <span>$</span><span className="md:ms-1">{product.price.toFixed(2)}</span>
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        $ {(product.total * product.price).toFixed(2)}
                    </td>
                </tr>
            ))}
            {totalEntrieProducts.filter(product => product.recurrent).map((product) => (
                <tr key={product.id}>
                    <td colSpan={3} className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-sm md:text-base">
                        {product.title} | <small className="font-normal"> {product.description}</small>
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center text-sm md:text-base">
                        {product.quantity}
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        $ {Number(product.price).toFixed(2)}
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right text-sm md:text-base">
                        $ {Number(product.quantity * product.price).toFixed(2)}
                    </td>
                </tr>
            ))}
            <tr>
                <td colSpan={5} className="px-1 md:px-6 py-1 border border-gray-300 bg-orange-200 leading-5">
                    <span className='font-semibold'>Total Monthly Charges</span><span className='text-xs'> (Prices do not include taxes or local government fees. Taxes and fees are calculated based on location of first billing statement)</span> 
                </td>
                <td colSpan={1} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 bg-orange-200 leading-5">
                    ${monthlyTotal.toFixed(2)}
                </td>
            </tr>
           
            </tbody>
        </table>
    </div>
  )
}

export default MonthlyCharges
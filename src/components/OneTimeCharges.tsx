'use client'
import { useTotalProducts } from "@/store/StaticProductT"
import { useTotalEntrieProducts } from "@/store/ManualEntries"
import { useTotalUsers, useTotalFax, useTotalConference } from "@/store/UserAccounts"
import { usePromoCode } from "@/store/PromoCodeStore"

const OneTimeCharges = () => {
    const { totalProducts } = useTotalProducts()
    const { totalEntrieProducts } = useTotalEntrieProducts()
    const {totalUsers} = useTotalUsers();
    const {totalFax} = useTotalFax();
    const {totalConference} = useTotalConference();
    const { promocode } = usePromoCode()

    let monthlyTotal = 0;
    let oneTimeTotal = 0;
    let monthlyEntries = 0;
    let oneTimeEntries = 0;
    let oneTimeTax = 0;

    //***********ojo este debe venir de la db******//
    const Users = {title:'Nationwide Unlimited Calling: Business VoIP Phone Service',price:24.99,total:totalUsers}
    const Fax = {title:'Nationwide Unlimited EFax service',price:7.99,total:totalFax}
    const Conference = {title:'Conference',price:14.99,total:totalConference}
    //***********ojo este debe venir de la db******//

    const TAX_RATE = 0.0775; // 7.75% tax rate

    if (totalProducts.length !== 0) {
        monthlyTotal = totalProducts.reduce((acc, product) => product.recurrent ? acc + product.total * product.price : acc, 0)
        oneTimeTotal = totalProducts.reduce((acc, product) => !product.recurrent ? acc + product.total * product.price : acc, 0)
        oneTimeTax = totalProducts.reduce((acc, product) => (!product.recurrent && (product as any).taxes) ? acc + product.total * product.price * TAX_RATE : acc, 0)
    }
    if (totalEntrieProducts.length !== 0) {
        monthlyEntries = totalEntrieProducts.reduce((acc, product) => product.recurrent ? acc + product.quantity * product.price : acc, 0)
        oneTimeEntries = totalEntrieProducts.reduce((acc, product) => !product.recurrent ? acc + product.quantity * product.price : acc, 0)
        oneTimeTax += totalEntrieProducts.reduce((acc, product) => (!product.recurrent && product.taxes) ? acc + product.quantity * product.price * TAX_RATE : acc, 0)
    }
    
    monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price;
    oneTimeTotal += oneTimeEntries;
    monthlyTotal = parseFloat(monthlyTotal.toFixed(2));
    oneTimeTotal = parseFloat(oneTimeTotal.toFixed(2));

    //console.log("totalproducts",totalProducts)
    //console.log(totalEntrieProducts)
  return (
    <div className='px-1 md:px-6 pt-6'>
        <table className="w-full border border-gray-500">
            <thead>
            <tr>
                <th colSpan={10} className="px-1 md:px-6 py-1  border border-gray-300 text-center text-base text-gray-500 tracking-wider bg-orange-200">
                    One Time Charges
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colSpan={4} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                    Description
                </td>
                <td colSpan={1} className="px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                    Qty
                </td>
                <td colSpan={2} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                    Rate
                </td>
                <td colSpan={2} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                    Total
                </td>
                <td colSpan={1} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                    Taxes
                </td>
            </tr>
            {totalProducts.filter(product => !product.recurrent).map((product) => (
                <tr key={product.id}>
                    <td colSpan={4} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5">
                        {product.title} | <small className="font-normal"> {product.description}</small>
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center">
                        {product.total}
                    </td>
                    <td colSpan={2} className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        <span>$</span><span className="md:ms-1">{product.price.toFixed(2)}</span>
                    </td>
                    <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        <span>$</span><span className="md:ms-1">{(product.total * product.price).toFixed(2)}</span>
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        <span>$</span><span className="md:ms-1">{(product as any).taxes ? (product.total * product.price * TAX_RATE).toFixed(2) : '0.00'}</span>
                    </td>
                </tr>
            ))}
            {totalEntrieProducts.filter(product => !product.recurrent).map((product) => (
                <tr key={product.id}>
                    <td colSpan={4} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5">
                        {product.title} | <small className="font-normal"> {product.description}</small>
                    </td>
                    <td colSpan={1} className="md:font-semibold px-1 md:px-2 py-1 border border-gray-300 leading-5 text-center">
                        {product.quantity}
                    </td>
                    <td colSpan={2} className="md:font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        <span>$</span><span className="md:ms-1">{Number(product.price).toFixed(2)}</span>
                    </td>
                    <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        <span>$</span><span className="md:ms-1">{Number(product.quantity * product.price).toFixed(2)}</span>
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        <span>$</span><span className="md:ms-1">{product.taxes ? (product.quantity * product.price * TAX_RATE).toFixed(2) : '0.00'}</span>
                    </td>
                </tr>
            ))}

            {promocode !== null && (
                <tr>
                    <td colSpan={6} className="px-1 md:px-6 py-1 border border-gray-300 leading-5">
                        <span className='font-semibold text-orange-900'>Discount</span><span className='text-xs'> </span> 
                    </td>
                    <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        {(promocode.discount*100).toFixed(2)}%
                    </td>
                    <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        ${(oneTimeTotal * promocode.discount).toFixed(2)}
                    </td>
                </tr>
            )}

            { oneTimeTax > 0 &&
                <tr>
                    <td colSpan={6} className="px-1 md:px-6 py-1 border border-gray-300 leading-5">
                        <span className='font-semibold text-orange-900'>Sales Taxes</span><span className='text-xs'> </span> 
                    </td>
                    <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        {(TAX_RATE * 100).toFixed(2)}%
                    </td>
                    <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        ${oneTimeTax.toFixed(2)}
                    </td>
                </tr>
            }
            <tr>
                <td colSpan={8} className="px-1 md:px-6 py-1 border border-gray-300 bg-orange-200 leading-5">
                    <span className='font-semibold'>Total One Time Charges</span><span className='text-xs'> </span> 
                </td>
                <td colSpan={2} className="font-semibold text-right px-1 md:px-6 py-1 border border-gray-300 bg-orange-200 leading-5">
                    ${promocode !== null ? 
                      (oneTimeTotal - oneTimeTotal * promocode.discount + oneTimeTax).toFixed(2) : 
                      (oneTimeTotal + oneTimeTax).toFixed(2)}
                </td>
            </tr>
           
            </tbody>
        </table>
    </div>
  )
}

export default OneTimeCharges
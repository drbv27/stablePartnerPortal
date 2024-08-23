import { usePromoCode } from "@/store/PromoCodeStore"
interface Product {
    _id: string;
    product: {
      title: string;
      description: string;
      price: number;
      recurrent: boolean;
    };
    quantity: number;
  }
interface Entrie {
    _id: string;
    title: string;
    description: string;
    price: string;
    recurrent: boolean;
    quantity: string;
    taxes: boolean;
  }

const OneTimeContract 
 = ({data}:any) => {
    const { totalProducts, totalEntrieProducts, totalUsers, totalFax, totalConference } = data;
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
        monthlyTotal = totalProducts.reduce((acc:number, product:Product) => product.product.recurrent ? acc + product.quantity * product.product.price : acc, 0)
        oneTimeTotal = totalProducts.reduce((acc:number, product:Product) => !product.product.recurrent ? acc + product.quantity * product.product.price : acc, 0)
        oneTimeTax = totalProducts.reduce((acc:number, product:Product) => (!product.product.recurrent && (product as any).taxes) ? acc + product.quantity * product.product.price * TAX_RATE : acc, 0)
    }
    //console.log(monthlyTotal)
    if (totalEntrieProducts.length !== 0) {
        monthlyEntries = totalEntrieProducts.reduce((acc:number, product:Entrie) => product.recurrent ? acc + Number(product.quantity) * Number(product.price) : acc, 0)
        oneTimeEntries = totalEntrieProducts.reduce((acc:number, product:Entrie) => !product.recurrent ? acc + Number(product.quantity) * Number(product.price) : acc, 0)
        oneTimeTax += totalEntrieProducts.reduce((acc:number, product:Entrie) => (!product.recurrent && product.taxes) ? acc + Number(product.quantity) * Number(product.price) * TAX_RATE : acc, 0)
    }
    
    monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price;
    oneTimeTotal += oneTimeEntries;
    monthlyTotal = parseFloat(monthlyTotal.toFixed(2));
    oneTimeTotal = parseFloat(oneTimeTotal.toFixed(2));
    //console.log(totalEntrieProducts)
    //console.log(totalProducts)
    //console.log(oneTimeTotal)
    return (
        <div className="w-full border border-gray-300 mt-4 p-1 md:p-4 rounded-md">
            <table className="min-w-full border border-gray-500">
                <thead>

                <tr>
                    <th colSpan={10} className="px-1 md:px-6 py-1  border border-gray-300 text-center text-base text-gray-600 tracking-wider bg-gray-200">
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
                {totalProducts.filter((product:Product) => !product.product.recurrent).map((product:any) => (
                    <tr key={product._id}>
                        <td colSpan={4} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                            {product.product.title} | <small className="font-normal"> {product.product.description}</small>
                        </td>
                        <td colSpan={1} className="font-semibold px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                            {product.quantity}
                        </td>
                        <td colSpan={2} className="font-normal md:font-semibold text-sm md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                            $ {product.product.price.toFixed(2)}
                        </td>
                        <td colSpan={2} className="font-normal md:font-semibold text-sm md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                            $ {(product.quantity * product.product.price).toFixed(2)}
                        </td>
                        <td colSpan={1} className="font-semibold text-sm px-1 md:px-2 py-1 border border-gray-300 leading-5 text-right">
                            <span>$</span><span className="md:ms-1">{(product as any).taxes ? (product.quantity * product.price * TAX_RATE).toFixed(2) : '0.00'}</span>
                        </td>
                    </tr>
                ))}
                {totalEntrieProducts.filter((product:Entrie) => !product.recurrent).map((product:any) => (
                    <tr key={product._id}>
                        <td colSpan={4} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                            {product.title} | <small className="font-normal"> {product.description}</small>
                        </td>
                        <td colSpan={1} className="font-semibold px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                            {product.quantity}
                        </td>
                        <td colSpan={2} className="font-normal md:font-semibold text-sm md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                            $ {Number(product.price).toFixed(2)}
                        </td>
                        <td colSpan={2} className="font-normal md:font-semibold text-sm md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                            $ {Number(product.quantity * product.price).toFixed(2)}
                        </td>
                        <td colSpan={1} className="font-normal md:font-semibold text-sm md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                            <span>$</span><span className="md:ms-1">{product.taxes ? (product.quantity * product.price * TAX_RATE).toFixed(2) : '0.00'}</span>
                        </td>
                    </tr>
                ))}

                {promocode !== null && (
                    <tr>
                        <td colSpan={6} className="px-1 md:px-6 py-1 border border-gray-300 leading-5">
                            <span className='font-semibold text-gray-600'>Discount</span><span className='text-xs'> </span> 
                        </td>
                        <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                            {(promocode.discount*100).toFixed(2)}%
                        </td>
                        <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                            ${(oneTimeTotal * promocode.discount).toFixed(2)}
                        </td>
                    </tr>
                )}

            <tr>
                <td colSpan={6} className="px-1 md:px-6 py-1 border border-gray-300 leading-5">
                    <span className='font-semibold text-gray-600'>Sales Taxes</span><span className='text-xs'> </span> 
                </td>
                <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                    {(TAX_RATE * 100).toFixed(2)}%
                </td>
                <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                    ${oneTimeTax.toFixed(2)}
                </td>
            </tr>
            <tr>
                <td colSpan={8} className="px-1 md:px-6 py-1 border border-gray-300 bg-gray-200 leading-5">
                    <span className='font-semibold'>Total One Time Charges</span><span className='text-xs'> </span> 
                </td>
                <td colSpan={2} className="font-semibold text-right px-1 md:px-6 py-1 border border-gray-300 bg-gray-200 leading-5">
                    ${promocode !== null ? 
                      (oneTimeTotal - oneTimeTotal * promocode.discount + oneTimeTax).toFixed(2) : 
                      (oneTimeTotal + oneTimeTax).toFixed(2)}
                </td>
            </tr>

{/*                 <tr>
                    <td colSpan={5} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                        <span className='font-semibold text-gray-900'>Sales Taxes</span><span className='text-xs'> </span> 
                    </td>
                    <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        7.75%
                    </td>
                    <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        ${(oneTimeTotal*0.0775).toFixed(2)}
                    </td>
                </tr>
                <tr>
                    <td colSpan={7} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 bg-gray-200 leading-5">
                        <span className='font-semibold'>Total One Time Charges</span><span className='text-xs'> </span> 
                    </td>
                    <td colSpan={2} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 bg-gray-200 leading-5">
                        ${(oneTimeTotal + oneTimeTotal * 0.0775).toFixed(2)}
                    </td>
                </tr> */}
            
                </tbody>
            </table>
        </div>
    )
}

export default OneTimeContract
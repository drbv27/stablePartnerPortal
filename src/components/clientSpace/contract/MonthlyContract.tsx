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
  }

const MonthlyContract = ({data}:any) => {
    const { totalProducts, totalEntrieProducts, totalUsers, totalFax, totalConference } = data;
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
        monthlyTotal = totalProducts.reduce((acc:number, product:Product) => product.product.recurrent ? acc + product.quantity * product.product.price : acc, 0)
        oneTimeTotal = totalProducts.reduce((acc:number, product:Product) => !product.product.recurrent ? acc + product.quantity * product.product.price : acc, 0)
    }
    //console.log(monthlyTotal)
    if (totalEntrieProducts.length !== 0) {
        monthlyEntries = totalEntrieProducts.reduce((acc:number, product:Entrie) => product.recurrent ? acc + Number(product.quantity) * Number(product.price) : acc, 0)
        oneTimeEntries = totalEntrieProducts.reduce((acc:number, product:Entrie) => !product.recurrent ? acc + Number(product.quantity) * Number(product.price) : acc, 0)
    }
    
    monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price;
    oneTimeTotal += oneTimeEntries;
    monthlyTotal = parseFloat(monthlyTotal.toFixed(2));
    oneTimeTotal = parseFloat(oneTimeTotal.toFixed(2));
  return (
    <div className="w-full border border-gray-300 mt-4 p-1 md:p-4 rounded-md overflow-x-auto">

        <table className="min-w-full border border-gray-500">
            <thead>
            <tr>
                <th colSpan={6} className="px-1 md:px-6 py-1  border border-gray-300 text-left text-gray-500  tracking-wider">
                    Order Details(Review Your Order)
                </th>
            </tr>
            <tr>
                <th colSpan={6} className="px-1 md:px-6 py-1  border border-gray-300 text-center text-base text-gray-600 tracking-wider bg-gray-200">
                    Monthly Charges
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td colSpan={3} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                    Description
                </td>
                <td colSpan={1} className="px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                    Qty
                </td>
                <td colSpan={1} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                    Rate
                </td>
                <td colSpan={1} className="px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                    Total
                </td>
            </tr>
            {totalProducts.filter((product:Product) => product.product.recurrent).map((product:any) => (
                <tr key={product._id}>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                        {product.product.title} | <small className="font-normal"> {product.product.description}</small>
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                        {product.quantity}
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold text-sm  px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        <span>$</span> <span>{product.product.price.toFixed(2)}</span>
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold  px-1 md:px-6 py-1 border border-gray-300 leading-5 text-right">
                        $ {(product.quantity * product.product.price).toFixed(2)}
                    </td>
                </tr>
            ))}
            {totalEntrieProducts.filter((product:Entrie) => product.recurrent).map((product:any) => (
                <tr key={product.id}>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                        {product.title} | <small className="font-normal"> {product.description}</small>
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                        {product.quantity}
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold text-sm  px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        $ {Number(product.price).toFixed(2)}
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold  px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        $ {Number(product.quantity * product.price).toFixed(2)}
                    </td>
                </tr>
            ))}
            {Users.total !== 0 &&
                <tr>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                        {Users.title}
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                        {Users.total}
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold text-sm  px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        $ {Users.price.toFixed(2)}
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold  px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        $ {(Users.total * Users.price).toFixed(2)}
                    </td>
                </tr>
            }
            {Fax.total !== 0 &&
                <tr>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                        {Fax.title}
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                        {Fax.total}
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold text-sm  px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        $ {Fax.price.toFixed(2)}
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold  px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        $ {(Fax.total * Fax.price).toFixed(2)}
                    </td>
                </tr>
            }
            {Conference.total !== 0 &&
                <tr>
                    <td colSpan={3} className="font-semibold px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5">
                        {Conference.title}
                    </td>
                    <td colSpan={1} className="font-semibold px-1 md:px-2 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-center">
                        {Conference.total}
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold text-sm  px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        $ {Conference.price.toFixed(2)}
                    </td>
                    <td colSpan={1} className="font-normal md:font-semibold  px-1 md:px-6 py-1 whitespace-no-wrap border border-gray-300 leading-5 text-right">
                        $ {(Conference.total * Conference.price).toFixed(2)}
                    </td>
                </tr>
            }
            <tr>
                <td colSpan={5} className="px-6 py-1 whitespace-no-wrap border border-gray-300 bg-gray-200 leading-5">
                    <span className='font-semibold'>Total Monthly Charges</span><span className='text-xs'> (Prices do not include taxes or local government fees. Taxes and fees are calculated based on location of first billing statement)</span> 
                </td>
                <td colSpan={1} className="font-semibold px-6 py-1 whitespace-no-wrap border border-gray-300 bg-gray-200 leading-5">
                    ${monthlyTotal}
                </td>
            </tr>
           
            </tbody>
        </table>

    </div>
  )
}

export default MonthlyContract
'use client'
import { FaCreditCard } from "react-icons/fa6";
import { RiBankFill } from "react-icons/ri";
import AproveContract from "./AproveContract";
const PaymentContract = ({contract}:any) => {
    //console.log(contract)
    if(contract.creditCard){
        const formattedCardNumber = contract.creditCard.cardNumber.match(/.{1,4}/g).join('-');
        return(
            <div className="p-1 px-8">
                <div className="text-center">
                    <h2 className="mt-4 text-2xl text-center">Payment</h2>
                    <div className="border border-slate-300 p-2 rounded-md shadow-xl">
                        <h2 className="flex justify-center gap-2">Payment Method: <span className="font-semibold">Credit Card</span><span className="text-orange-600"><FaCreditCard/></span></h2>
                        <h2>Card Owner: <span className="font-semibold">{contract.creditCard.fullName}</span></h2>
                        <h2>Card Number: <span className="font-semibold">{formattedCardNumber}</span></h2>
                        <h2>Expiration Date: <span className="font-semibold">{`${contract.creditCard.expirationMonth}/${contract.creditCard.expirationYear}`}</span></h2>
                        <h2>Security Code: <span className="font-semibold">{contract.creditCard.cvv}</span></h2>
                        <h2>IP Address: <span className="font-semibold">{contract.creditCard.ipAddress}</span></h2>
                        <h2>Sign date: <span className="font-semibold">{contract.signDate}</span></h2>
                        <h2>Signature:</h2>
                        <div className="w-full md:w-1/3 border border-slate-300 mt-2 flex justify-center items-center rounded-lg mx-auto shadow-lg">
                            <img src={contract.signatureClient} alt="signature" className="rounded-lg"/>
                        </div>
                    </div>
                </div>
                <div>
                    <AproveContract contract={contract}/>
                </div>
            </div>
        )
    }
    if(contract.bankTransfer){
        return(
            <div className="p-1 px-8">
                <div>
                    <h2 className="mt-4 text-2xl text-center">Payment</h2>
                    <div className="border border-slate-300 p-2 rounded-md shadow-xl">
                        <h2>Payment Method: Bank Transfer</h2>
                        <h2>Bank Name: <span className="font-semibold">{contract.bankTransfer.bankName}</span><span className="text-orange-600"><RiBankFill/></span></h2>
                        <h2>Account number: <span className="font-semibold">{contract.bankTransfer.accountNumber}</span></h2>
                        <h2>Routing number: <span className="font-semibold">{contract.bankTransfer.routingNumber}</span></h2>
                        <h2>IP Address: <span className="font-semibold">{contract.bankTransfer.ipAddress}</span></h2>
                        <h2>Sign date: <span className="font-semibold">{contract.signDate}</span></h2>
                        <div className="w-full md:w-1/3 border border-slate-300 mt-2 flex justify-center rounded-md">
                            <img src={contract.signatureClient} alt="" />
                        </div>
                    </div>
                </div>
                <div>
                    <AproveContract contract={contract}/>
                </div>
            </div>
        )
    }
  return (
    <div>PaymentContract</div>
  )
}

export default PaymentContract
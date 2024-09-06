"use client";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  useTotalUsers,
  useTotalFax,
  useTotalConference,
} from "@/store/UserAccounts";
import { usePortNumbers } from "@/store/PortNumbersStore";
import { useTotalProducts } from "@/store/StaticProductT";
import { useTotalEntrieProducts } from "@/store/ManualEntries";
import OneTimeCharges from "@/components/OneTimeCharges";

const QuoteValues = () => {
  const { totalProducts, removeProducts } = useTotalProducts();
  const { totalEntrieProducts, removeEntrieProducts } =
    useTotalEntrieProducts();
  const { totalUsers, removeUser } = useTotalUsers();
  const { totalFax, removeFax } = useTotalFax();
  const { totalConference, removeConference } = useTotalConference();
  const { portNumbers, resetPortNumbers } = usePortNumbers();
  let monthlyTotal = 0;
  let oneTimeTotal = 0;
  let monthlyEntries = 0;
  let oneTimeEntries = 0;

  //***********ojo este debevenir de la db******//
  const Users = { title: "Users", price: 24.99, total: totalUsers };
  const Fax = { title: "VFax", price: 7.99, total: totalFax };
  const Conference = {
    title: "Conference",
    price: 14.99,
    total: totalConference,
  };
  //***********ojo este debevenir de la db******//

  if (totalProducts.length !== 0) {
    monthlyTotal = totalProducts.reduce(
      (acc, product) =>
        product.recurrent ? acc + product.total * product.price : acc,
      0
    );
    oneTimeTotal = totalProducts.reduce(
      (acc, product) =>
        !product.recurrent ? acc + product.total * product.price : acc,
      0
    );
  }
  if (totalEntrieProducts.length !== 0) {
    monthlyEntries = totalEntrieProducts.reduce(
      (acc, product) =>
        product.recurrent ? acc + product.quantity * product.price : acc,
      0
    );
    oneTimeEntries = totalEntrieProducts.reduce(
      (acc, product) =>
        !product.recurrent ? acc + product.quantity * product.price : acc,
      0
    );
  }

  if (portNumbers.length > 2) {
    monthlyTotal +=
      monthlyEntries +
      Users.total * Users.price +
      Fax.total * Fax.price +
      Conference.total * Conference.price +
      (portNumbers.length - 2) * 2.0;
  } else {
    monthlyTotal +=
      monthlyEntries +
      Users.total * Users.price +
      Fax.total * Fax.price +
      Conference.total * Conference.price;
  }
  //monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price;
  oneTimeTotal += oneTimeEntries;
  monthlyTotal = parseFloat(monthlyTotal.toFixed(2));
  oneTimeTotal = parseFloat(oneTimeTotal.toFixed(2));
  const handleRemove = (product: any) => {
    const newProducts = totalProducts.filter(
      (item) => item.title !== product.title
    );
    removeProducts(newProducts);
  };
  const handleRemoveEntrie = (product: any) => {
    const newProducts = totalEntrieProducts.filter(
      (item) => item.title !== product.title
    );
    removeEntrieProducts(newProducts);
  };

  return (
    <div className="w-11/12 md:w-[28vw]  bg-gray-200  text-slate-800">
      <div>
        <div className="bg-orange-500 text-center text-white font-semibold text-lg">
          Quote
        </div>
        <div className="bg-orange-900 border border-b-2 border-orange-500 text-center text-white font-semibold">
          Accounts
        </div>
        <div></div>
        <div>
          {totalUsers !== 0 && (
            <div className="flex justify-between">
              <div>
                <button onClick={() => removeUser()}>
                  <IoCloseCircleOutline className="text-red-500" size={19} />
                </button>
                <span>
                  {" "}
                  {Users.title}{" "}
                  <small className="text-white bg-orange-500 px-1 rounded-lg text-xs">
                    R
                  </small>
                </span>
              </div>
              <div>
                <span className="text-orange-400">({totalUsers}) </span>x $
                {Users.price}
              </div>
            </div>
          )}
          {totalFax !== 0 && (
            <div className="flex justify-between">
              <div>
                <button onClick={() => removeFax()}>
                  <IoCloseCircleOutline className="text-red-500" size={19} />
                </button>
                <span>
                  {" "}
                  {Fax.title}{" "}
                  <small className="text-white bg-orange-500 px-1 rounded-lg text-xs">
                    R
                  </small>
                </span>
              </div>
              <div>
                <span className="text-orange-400">({totalFax}) </span>x $
                {Fax.price}
              </div>
            </div>
          )}
          {totalConference !== 0 && (
            <div className="flex justify-between">
              <div>
                <button onClick={() => removeConference()}>
                  <IoCloseCircleOutline className="text-red-500" size={19} />
                </button>
                <span>
                  {" "}
                  {Conference.title}{" "}
                  <small className="text-white bg-orange-500 px-1 rounded-lg text-xs">
                    R
                  </small>
                </span>
              </div>
              <div>
                <span className="text-orange-400">({totalConference}) </span>x $
                {Conference.price}
              </div>
            </div>
          )}
          {portNumbers.length - 2 > 0 && (
            <div className="flex justify-between">
              <div>
                <button onClick={() => resetPortNumbers()}>
                  <IoCloseCircleOutline className="text-red-500" size={19} />
                </button>
                <span>
                  Port numbers{" "}
                  <small className="text-white bg-orange-500 px-1 rounded-lg text-xs">
                    R
                  </small>
                </span>
              </div>
              <div>
                <span className="text-orange-400">
                  ({portNumbers.length - 2}){" "}
                </span>
                x $2.00
              </div>
            </div>
          )}
        </div>
        <div className="bg-orange-900 border border-b-2 border-orange-500 text-center text-white font-semibold">
          MarketPlace
        </div>
        <div>
          <div>
            {totalProducts.map((product, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <button onClick={() => handleRemove(product)}>
                    <IoCloseCircleOutline className="text-red-500" size={19} />
                  </button>
                  <span>
                    {product.title}
                    {product.recurrent ? (
                      <small className="text-white bg-orange-500 px-1 rounded-lg text-xs ml-1">
                        R
                      </small>
                    ) : (
                      <small className="text-white bg-gray-500 px-1 rounded-lg text-xs ml-1">
                        OT
                      </small>
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-orange-400">({product.total}) </span>x $
                  {product.price}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-orange-900 border border-b-2 border-orange-500 text-center text-white font-semibold">
          Phone Numbers
        </div>
        <div></div>
        <div className="bg-orange-900 border border-b-2 border-orange-500 text-center text-white font-semibold">
          Miscellaneous
        </div>
        <div>
          <div>
            {totalEntrieProducts.map((product, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <button onClick={() => handleRemoveEntrie(product)}>
                    <IoCloseCircleOutline className="text-red-500" size={19} />
                  </button>
                  <span>
                    {product.title}
                    {product.recurrent ? (
                      <small className="text-white bg-orange-500 px-1 rounded-lg text-xs ml-1">
                        R
                      </small>
                    ) : (
                      <small className="text-white bg-gray-500 px-1 rounded-lg text-xs ml-1">
                        OT
                      </small>
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-orange-400">({product.quantity}) </span>
                  x ${product.price}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-orange-800 text-center text-white font-semibold">
          Total charges
        </div>
        <div className="bg-gray-100 text-center text-orange-800 font-semibold border border-orange-800 flex justify-between px-2 mt-1 shadow-md">
          <span>OneTime:</span>
          <span>${oneTimeTotal}</span>
        </div>
        <div className="bg-gray-100 text-center text-orange-800 font-semibold border border-orange-800 flex justify-between px-2 mt-1 shadow-md">
          <span>Monthly:</span>
          <span>${monthlyTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteValues;

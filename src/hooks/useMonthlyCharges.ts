import { useTotalProducts } from "@/store/StaticProductT";
import { useTotalEntrieProducts } from "@/store/ManualEntries";
import {
  useTotalUsers,
  useTotalFax,
  useTotalConference,
} from "@/store/UserAccounts";
import { usePortNumbers } from "@/store/PortNumbersStore";

export const useMonthlyCharges = () => {
  const { totalProducts } = useTotalProducts();
  const { totalEntrieProducts } = useTotalEntrieProducts();
  const { totalUsers } = useTotalUsers();
  const { portNumbers } = usePortNumbers();
  const { totalFax } = useTotalFax();
  const { totalConference } = useTotalConference();

  const staticServices = [
    {
      title: "Nationwide Unlimited Calling: Business VoIP Phone Service",
      price: 24.99,
      total: totalUsers,
    },
    {
      title: "Nationwide Unlimited EFax service",
      price: 7.99,
      total: totalFax,
    },
    { title: "Conference", price: 14.99, total: totalConference },
  ];

  const calculateTotals = () => {
    let monthlyTotal = 0;
    let oneTimeTotal = 0;

    // Calculate totals from totalProducts
    totalProducts.forEach((product) => {
      if (product.recurrent) {
        monthlyTotal += product.total * product.price;
      } else {
        oneTimeTotal += product.total * product.price;
      }
    });

    // Calculate totals from totalEntrieProducts
    totalEntrieProducts.forEach((product) => {
      if (product.recurrent) {
        monthlyTotal += product.quantity * product.price;
      } else {
        oneTimeTotal += product.quantity * product.price;
      }
    });

    // Add static services
    staticServices.forEach((service) => {
      monthlyTotal += service.total * service.price;
    });

    // Add port numbers charge
    const portNumbersCharge = Math.max(0, (portNumbers.length - 2) * 2.0);
    monthlyTotal += portNumbersCharge;

    return {
      monthlyTotal: parseFloat(monthlyTotal.toFixed(2)),
      oneTimeTotal: parseFloat(oneTimeTotal.toFixed(2)),
    };
  };

  const { monthlyTotal, oneTimeTotal } = calculateTotals();

  return {
    staticServices,
    portNumbers,
    totalProducts,
    totalEntrieProducts,
    monthlyTotal,
    oneTimeTotal,
  };
};

import ContractsTable from "@/components/ContractsTable";
import { getContracts } from "@/actions/payments/payment-actions";
import { getQuotes } from "@/actions/quotes/quotes-actions";

const DownloadContractsPage = async () => {
  try {
    const [{ contracts }, { quotes }] = await Promise.all([
      getContracts(),
      getQuotes(),
    ]);

    if (!quotes || quotes.length === 0) {
      return <div>No quotes available</div>;
    }

    return (
      <>
        <h2 className="text-center text-lg font-bold text-orange-900">
          Contracts Page
        </h2>
        <ContractsTable quotes={quotes} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }
};

export default DownloadContractsPage;

import ApprovedsTable from "@/components/ApprovedsTable";
import { getQuotes } from "@/actions/quotes/quotes-actions";

const AproveQuotePage = async () => {
  try {
    const { quotes } = await getQuotes();

    if (!quotes || quotes.length === 0) {
      return <div>No quotes available for approval</div>;
    }

    return (
      <div className="p-4">
        <h1 className="text-center text-xl text-orange-900 font-bold mb-1">
          Quotes to be approved
        </h1>
        <ApprovedsTable quotes={quotes} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return <div>Error loading quotes</div>;
  }
};

export default AproveQuotePage;

// hooks/useApprovedsTable.ts
import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useApprovedsTable = (quotes: any[]) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [companyFilter, setCompanyFilter] = useState("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyFilter(e.target.value);
  };

  const clearFilter = () => {
    setCompanyFilter("");
  };

  const filteredQuotes = useMemo(() => {
    if (!quotes) return [];

    return quotes
      .filter(
        (quote: any) =>
          quote.status === "signed" &&
          quote.company?.companyName
            .toLowerCase()
            .includes(companyFilter.toLowerCase())
      )
      .sort((a: any, b: any) => b.quoteNo - a.quoteNo);
  }, [quotes, companyFilter]);

  // Redirect if not admin
  if ((session?.user as any)?.role !== "admin") {
    router.push("/dashboard/main");
    return {
      filteredQuotes: [],
      companyFilter,
      handleFilterChange,
      clearFilter,
    };
  }

  return { filteredQuotes, companyFilter, handleFilterChange, clearFilter };
};

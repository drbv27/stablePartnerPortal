import { getAllLeads } from "@/actions/leads/leads-actions";
import LeadsTable from "@/components/leads/LeadsTable";


export default async function LeadListPage() {
  const { leads } = await getAllLeads();

  //console.log(leads)

  return (
   <LeadsTable leads={leads}/>
  );
}
import { getLead } from "@/actions/leads/leads-actions";
import EditLeadForm from "@/components/EditLeadForm";

interface Props {
    params: {
      id: string;
    };
  }

export default async function LeadPage({params}: Props) {
    const {lead} = await getLead(params.id);
    //console.log(lead)
  return (
    <div className="p-2">
      <h1 className="text-2xl text-center font-semibold text-orange-800">Edit: {lead && lead.companyName}</h1>
      <EditLeadForm lead={lead}/>
    </div>
  );
}
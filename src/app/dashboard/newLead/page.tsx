
import NewLeadForm from "@/components/NewLeadForm";

export default function NewLeadPage() {
  return (
    <div className="w-[83.5vw] h-[100%] p-2">
      <h2 className="text-xl md:text-3xl text-orange-900 text-center">Create your new lead </h2>
      {/* <p className="text-sm text-center">The person who manages this Company account is the Account Owner and will set up the rest of your User accounts later.</p> */}
      <p className="text-sm text-center mb-2">Fill out the form to create your lead</p>
        <NewLeadForm />
    </div>
  );
}
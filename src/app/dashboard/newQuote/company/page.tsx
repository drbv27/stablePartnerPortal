import CompanyForm from "@/components/CompanyForm";

export default function CompanyPage() {
  return (
    <div className="w-full h-[100%] p-2">
      <h2 className="text-xl md:text-3xl text-orange-900 text-center">
        Create your company account{" "}
      </h2>
      <p className="text-sm text-center">
        The person who manages this Company account is the Account Owner and
        will set up the rest of your User accounts later.
      </p>
      <p className="text-sm text-center mb-2">
        Fill out the form to create your company account
      </p>
      <CompanyForm />
    </div>
  );
}

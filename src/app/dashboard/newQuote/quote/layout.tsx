import QuoteValues from "@/components/QuoteValues"

const layout = ({ children }: {children: React.ReactNode; }) => {
  return (
    <div>
        <div className="flex flex-col md:flex-row">
            <div className="w-[85vw] md:w-[70vw] text-slate-900">
              {children}
            </div>
            <QuoteValues />
        </div>
    </div>
  )
}

export default layout

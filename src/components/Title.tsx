import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={ `md:mt-1 ${ className }` }>
      <h1 className={ `${ titleFont.className } antialiased text-xl md:text-4xl font-semibold my-1 md:my-5` }>
        { title }
      </h1>

      {
        subtitle && (
          <h3 className="text-md md:text-xl mb-5">{ subtitle }</h3>
        )
      }

    </div>
  )
}
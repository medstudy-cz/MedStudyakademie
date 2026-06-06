import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  className?: string;
  id?: string;
};

export function SectionHeading({ title, className, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl",
        className,
      )}
    >
      {title}
    </h2>
  );
}

import { getTranslations } from "next-intl/server";

type StatItem = {
  value: string;
  label: string;
};

export async function StatsSection() {
  const t = await getTranslations("stats");
  const items = t.raw("items") as StatItem[];

  return (
    <section className="bg-primary py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => (
            <li key={item.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-sky-100 sm:text-base">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

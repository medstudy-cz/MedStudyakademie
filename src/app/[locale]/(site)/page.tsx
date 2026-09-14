import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { VolunteerSection } from "@/components/sections/VolunteerSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <StatsSection />
      <AudienceSection />
      <PartnersSection />
      <VolunteerSection />
      <ContactSection />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

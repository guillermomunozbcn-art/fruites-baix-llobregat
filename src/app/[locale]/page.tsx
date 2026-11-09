import {
  HomeBuyers,
  HomeContact,
  HomeExperience,
  HomeFeatured,
  HomeHero,
  HomeIntro,
  HomeMercabarna,
  HomeOrigin,
  HomeProducers,
  HomeSuppliersInvite,
} from "@/components/home/HomeSections";
import { type LocaleParams, resolveLocale } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocaleParams) {
  return buildMetadata(await resolveLocale(params), "/");
}

export default async function HomePage({ params }: LocaleParams) {
  await resolveLocale(params);
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeFeatured />
      <HomeOrigin />
      <HomeBuyers />
      <HomeExperience />
      <HomeMercabarna />
      <HomeProducers />
      <HomeSuppliersInvite />
      <HomeContact />
    </>
  );
}

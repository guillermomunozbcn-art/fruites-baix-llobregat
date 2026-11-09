import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <Container className="py-28 lg:py-40">
      <p className="font-display text-7xl text-sage">404</p>
      <h1 className="mt-6 text-4xl text-forest sm:text-5xl">{t("title")}</h1>
      <p className="mt-5 max-w-xl text-lg text-stone">{t("body")}</p>
      <div className="mt-9">
        <ButtonLink href="/">{t("home")}</ButtonLink>
      </div>
    </Container>
  );
}

import { getTranslations } from "next-intl/server";
import { GA_ID } from "@/config/site";
import { company, stallsLabel } from "@/data/company";
import { Link } from "@/i18n/navigation";
import { CookieSettingsButton } from "../consent/CookieSettingsButton";
import { MailIcon, PhoneIcon, PinIcon } from "../ui/Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { navItems } from "./navItems";

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-deep text-ivory/80">
      <div className="mx-auto w-full max-w-[1320px] px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="inline-block rounded-2xl bg-ivory px-6 py-5">
              <Logo variant="stacked" className="h-auto w-[200px]" />
            </div>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">{t("description")}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-ochre">{tc("b2bOnly")}</p>
          </div>

          <nav aria-label={t("navTitle")} className="lg:col-span-2">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory">{t("navTitle")}</h2>
            <ul className="mt-5 space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-9 items-center hover:text-ivory">
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory">{t("contactTitle")}</h2>
            <address className="mt-5 space-y-4 not-italic">
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-ivory">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-ochre" />
                <span>
                  {company.legalName}
                  <br />
                  {company.address.market} · {tc("pavilion", { pavilion: company.address.pavilion })}
                  <br />
                  {tc("stalls", { stalls: stallsLabel() })}
                  <br />
                  {company.address.postalCode} {company.address.locality}
                  <span className="sr-only"> {tc("newWindow")}</span>
                </span>
              </a>
              <a href={company.phone.href} className="flex min-h-9 items-center gap-3 hover:text-ivory">
                <PhoneIcon className="size-5 shrink-0 text-ochre" /> {company.phone.display}
              </a>
              <a href={`mailto:${company.email}`} className="flex min-h-9 items-center gap-3 break-all hover:text-ivory">
                <MailIcon className="size-5 shrink-0 text-ochre" /> {company.email}
              </a>
            </address>
          </div>

          <div className="space-y-10 lg:col-span-3">
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory">{t("legalTitle")}</h2>
              <ul className="mt-5 space-y-1">
                <li><Link href="/aviso-legal" className="inline-flex min-h-9 items-center hover:text-ivory">{t("legalNotice")}</Link></li>
                <li><Link href="/privacidad" className="inline-flex min-h-9 items-center hover:text-ivory">{t("privacy")}</Link></li>
                <li><Link href="/cookies" className="inline-flex min-h-9 items-center hover:text-ivory">{t("cookies")}</Link></li>
                {GA_ID && (
                  <li>
                    <CookieSettingsButton className="inline-flex min-h-9 items-center hover:text-ivory">{t("cookieSettings")}</CookieSettingsButton>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ivory">{t("languagesTitle")}</h2>
              <div className="-ml-2 mt-3">
                <LanguageSwitcher tone="light" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ivory/10 pt-6 text-xs text-ivory/60 sm:flex-row sm:justify-between">
          <p>
            © {year} {company.legalName} {t("rights")}
          </p>
          <p>{t("photoNote")}</p>
        </div>
      </div>
    </footer>
  );
}

import type { ReactNode } from "react";

// El <html> se define en app/[locale]/layout.tsx para fijar el atributo lang por idioma.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

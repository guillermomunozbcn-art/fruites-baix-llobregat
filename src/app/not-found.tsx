import Link from "next/link";
import "@/styles/globals.css";

// Respaldo para rutas fuera de los idiomas (normalmente el middleware redirige antes).
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="flex min-h-screen items-center justify-center bg-ivory p-8 text-center">
        <div>
          <h1 className="text-4xl text-forest">404</h1>
          <p className="mt-4">
            <Link className="underline" href="/es">Fruites del Baix Llobregat</Link>
          </p>
        </div>
      </body>
    </html>
  );
}
